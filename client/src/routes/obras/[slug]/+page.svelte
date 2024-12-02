<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";
  import QRCode from "qrcode"

  let qrCodeUrl='loading'
  let qrCodeData=""
  let mostrarQR=false
  let userRole=null
  let nombreusu=""
  
  let slug;
  let nombreObra=""
  let mostrandoCarga = true;
  let animate = false; // Control de animación

  let artistas = [];
  let eventos = [];

  $: slug = $page.params.slug;

  console.log(slug)
  
  let obra = {}; // Objeto vacío para los datos de la obra

  function decodificarToken(token) {
    try {
      const payload = token.split('.')[1]; // Extraemos el payload del JWT (parte del medio)
      const decoded = atob(payload); // Decodificamos la base64
      return JSON.parse(decoded); // Convertimos el JSON
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  async function fetchObra(slug) {
    mostrandoCarga = true;
    console.log("Buscando obra con slug:", slug); // Verifica el slug antes de la petición
    nombreObra=slug
    try {
      const response = await axios.get(
        `http://localhost:3001/api/obras/${slug}`,
        {
          // Cambia la ruta a '/api/obras'
          params: { nombre: slug },
        }
      );
      console.log("Datos de la obra recibidos:", response.data); // Verifica los datos que se reciben
      obra = response.data.cardsEscultura;
      artistas = response.data.cardsArtistas;
      eventos = response.data.cardsEventos;
      if(obra.obraEscultor.escultoresNombre.includes(nombreusu)){
        mostrarQR=true;
        generateQRCode();
        setInterval(generateQRCode, 60000); // 60000 ms = 1 minuto
      }
      else{
        mostrarQR=false
      }
      // Reinicia y activa la animación para las nuevas tarjetas
      animate = false;
      setTimeout(() => {
        animate = true;
      }, 0);
    } catch (error) {
      console.log("Error al obtener la obra:", error);
    }
    mostrandoCarga = false;
  }

 async function generateQRCode() {
     // Generar un token único que cambia cada minuto
     const timestamp = Math.floor(Date.now() / 60000); // Cada minuto cambia
     const uniqueSlug = `${nombreObra}-${timestamp}`;

     const url = `http://localhost:3333/votacion?slug=${uniqueSlug}`;
     // Generar el código QR
     qrCodeUrl = url;
     console.log(qrCodeUrl)
     qrCodeData = await QRCode.toDataURL(url);
   }
   
   
   onMount(() => {
     let token = localStorage.getItem('token');
     let userRole = localStorage.getItem('role');
     if (token){
      let decoded=decodificarToken(token)
      nombreusu=decoded.nombre
      }
    fetchObra(slug);     
    });

    
 //   // Actualizar el QR cada minuto
 
</script>

<!-- Mostrar el ícono de carga solo cuando mostrandoCarga es true -->
{#if mostrandoCarga}
    <div class="loading-icon"></div>
{/if}

{#if !mostrandoCarga}
  <!-- Renderizado de la página de detalle de la obra -->
  <article class="obra-detail-container max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <header class="text-center">
      <img
        src={obra.obraImage}
        alt={obra.title}
        class="w-full h-64 object-cover rounded-t-lg"
      />
      <h1 class="text-3xl font-bold mt-4">{obra.obraName}</h1>
    </header>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Técnica</h2>
      <p>{obra.content}</p>
      <!-- Muestra la técnica de la obra -->
    </section>
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Antecedente</h2>
      <p>{obra.antecedente}</p>
      <!-- Muestra el antecedente de la obra -->
    </section>
    {#if mostrarQR}
    <section class="mt-2">
      <img src={qrCodeData} alt = 'QR'/>
      <!-- Muestra el antecedente de la obra -->
    </section>
    {/if}
  </article>

  <!-- Contenedor de los artistas -->
  <h1 class="text-3xl font-bold mt-4">Artistas que realizaron la obra</h1>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 auto-rows-auto">
    {#each artistas as card}
      <div class="block rounded-lg bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md {animate ? 'animate' : ''}">
        <div class="relative overflow-hidden bg-cover bg-no-repeat">
          <a href={`/escultores/${encodeURIComponent(card.escultorPantalla)}`}>
            <img
              src={card.escultorFoto}
              class="w-40 rounded-full mx-auto pt-2"
              alt="Avatar" />
            <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>    
        </div>
        <div class="p-6 text-surface dark:text-white">
          <h5 class="mb-2 text-xl font-medium leading-tight text-black">
            {card.escultorName}
          </h5>
          <p class="mb-4 text-base text-left text-black">{card.content}</p>
          <p class="text-sm text-left text-gray-600">
            Contacto: <a href="mailto:{card.contactoEmail}" class="text-blue-600 hover:underline">{card.contactoEmail}</a>
          </p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Contenedor de los eventos -->
  <h1 class="text-3xl font-bold mt-4">Eventos en el que participa la obra</h1>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 auto-rows-auto {animate ? 'animate' : ''}">
      {#each eventos as card}
          <div class="card block rounded-lg bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md" class:animate={animate}>
              <div class="relative overflow-hidden bg-cover bg-no-repeat">
                  <a href={`/eventos/${card.eventoPantalla}`} class="hover:underline">
                  <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                  </a>
                  <div class="p-6 text-surface dark:text-white">
                      <h5 class="mb-2 text-xl font-medium leading-tight text-black">{card.eventName}</h5>
                      <span class="text-cyan-900">{card.eventStartDate} - {card.eventFinishDate}</span><br>
                      <span class="text-cyan-900">De {card.startTime} a {card.finishTime}</span><br>
                      <span class="text-cyan-900">Lugar: {card.location}</span>
                      <p class="mb-4 text-base text-left text-black">{card.content}</p>
                  </div>
              </div>
          </div>
      {/each}
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate {
    animation: fadeIn 0.5s ease forwards;
  }
  /* Personaliza los estilos para la página de detalle de cada obra */
  .obra-detail-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }
  .max-w-2xl {
    max-width: 768px;
  }
   /* Estilos para el ícono de carga */
    .loading-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 1000;
    }

    /* Animación de giro */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
