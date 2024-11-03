<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
  
    // Obtener el slug de la URL
    let slug;
    $: slug = $page.params.slug;
  
    /**
     * @type {any}
     */
    let escultor = {}; // Datos específicos del escultor
  
    // Función para obtener los datos de un escultor específico
    async function fetchEscultor(slug = "") {
      try {
        const res = await axios.get(`http://localhost:3001/api/escultores/${slug}`);
        escultor = res.data; // Guarda los datos en la variable escultor
      } catch (error) {
        console.log("Error al obtener escultor:", error);
      }
    }
  
    // Ejecuta la consulta cuando se monta la página
    onMount(() => {
      fetchEscultor(slug); // Realiza la consulta usando el slug
    });
  </script>

<article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
  <header class="text-center">
    <img src={escultor.escultorFoto} alt="{escultor.escultorName}" class="w-32 h-32 rounded-full mx-auto" />
    <h1 class="text-3xl font-bold mt-4">{escultor.escultorName}</h1>
  </header>

  <section class="mt-4">
    <h2 class="text-xl font-semibold">Biografía</h2>
    <p>{escultor.content}</p>
  </section>

  <section class="mt-4">
    <h2 class="text-xl font-semibold">Contacto</h2>
    <p>Email: <a href="mailto:{escultor.contactoEmail}" class="text-blue-600 hover:underline">{escultor.contactoEmail}</a></p>
  </section>
</article>

<style>
  /* Aquí puedes personalizar los estilos */
</style>