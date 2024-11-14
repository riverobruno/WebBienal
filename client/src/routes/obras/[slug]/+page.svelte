<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import axios from "axios";
  import { page } from "$app/stores";

  let slug;
  $: slug = $page.params.slug;

  let obra = {}; // Objeto vacío para los datos de la obra

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

// async function generateQRCode() {
//     // Generar un token único que cambia cada minuto
//     const timestamp = Math.floor(Date.now() / 60000); // Cada minuto cambia
//     const uniqueSlug = `${slug}-${timestamp}`;
//     const url = `http://localhost:5173/votacion?slug=${uniqueSlug}`;

//     // Generar el código QR
//     qrCodeUrl = url;
//     qrCodeData = await QRCode.toDataURL(url);
//   }

//   // Actualizar el QR cada minuto
//   setInterval(generateQRCode, 60000); // 60000 ms = 1 minuto

//   //de la 31 a las 45 QR

   onMount(() => {
     fetchObra(slug);
   });
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
