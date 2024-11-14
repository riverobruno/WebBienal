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
      obra = response.data;
      if(obra.obraEscultor == nombreusu ){
       mostrarQR=true
       
      generateQRCode()
      setInterval(generateQRCode, 60000); // 60000 ms = 1 minuto
    }
    else{
       mostrarQR=false
    }
    
    } catch (error) {
      console.log("Error al obtener la obra:", error);
    }
  }

 async function generateQRCode() {
     // Generar un token único que cambia cada minuto
     const timestamp = Math.floor(Date.now() / 60000); // Cada minuto cambia
     const uniqueSlug = `${nombreObra}-${timestamp}`;

     const url = `http://localhost:5173/votacion?slug=${uniqueSlug}`;
     // Generar el código QR
     qrCodeUrl = url;
     console.log(qrCodeUrl)
     qrCodeData = await QRCode.toDataURL(url);
   }
   
   
   onMount(() => {
     let token = localStorage.getItem('token');
     let userRole=localStorage.getItem('role');
     
     let decoded=decodificarToken(token)
     nombreusu=decoded.nombre
     fetchObra(slug);     
    });

    
 //   // Actualizar el QR cada minuto
 
</script>

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
    <img src={qrCodeData}/>
    <!-- Muestra el antecedente de la obra -->
  </section>
  {/if}


</article>

<style>
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
</style>
