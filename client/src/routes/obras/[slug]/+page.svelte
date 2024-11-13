<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";
  import QRCode from "qrcode"; //QR

  let slug;
  $: slug = $page.params.slug;

  let obra = {}; // Objeto vacío para los datos de la obra
  let qrCodeData = ""; //QR
  let qrCodeUrl = ""; //QR
  let secretToken = ""; //QR

  async function fetchObra(slug) {
    console.log("Buscando obra con slug:", slug); // Verifica el slug antes de la petición
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
    } catch (error) {
      console.log("Error al obtener la obra:", error);
    }
  }

  async function generateQRCode() {
    // Generar un token único que cambia cada minuto
    const timestamp = Math.floor(Date.now() / 60000); // Cada minuto cambia
    secretToken = btoa(`${slug}-${timestamp}`); // Encriptar el token usando Base64
    const url = `http://localhost:3001/votacion?token=${secretToken}`;

    // Generar el código QR
    qrCodeUrl = url;
    qrCodeData = await QRCode.toDataURL(url);
  }

  // Actualizar el QR cada minuto
  setInterval(generateQRCode, 60000); // 60000 ms = 1 minuto

  //de la 31 a las 45 QR

  onMount(() => {
    fetchObra(slug);
    generateQRCode(); // Generar el QR al cargar la página
  });
</script>

<!-- Renderizado de la página de detalle de la obra -->
<article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
  <header class="text-center">
    <img
      src={obra.obraImage}
      alt={obra.title}
      class="w-full h-64 object-cover rounded-t-lg"
    />
    <!-- Cambia obraImage a obra.imagen -->
    <h1 class="text-3xl font-bold mt-4">{obra.obraName}</h1>
    <!-- Cambia obraName a obra.nombre -->
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

  <!-- Botón para Generar QR Code -->
  <div class="text-center mt-8">
    <button
      on:click={generateQRCode}
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Generar QR para Votar
    </button>

    <!-- Mostrar QR Code generado -->
    {#if qrCodeData}
      <div class="mt-4">
        <img src={qrCodeData} alt="Código QR para votar" class="mx-auto" />
        <p class="mt-2">
          Escanea el código para votar en la obra seleccionada.
        </p>
      </div>
    {/if}
  </div>
</article>

<style>
  /* Personaliza los estilos para la página de detalle de cada obra */

  .max-w-2xl {
    max-width: 768px;
  }
</style>
