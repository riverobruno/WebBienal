<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
  
    let slug;
    $: slug = $page.params.slug;

    let cards = {}
  
    async function fetchEscultor(slug) {
        console.log('Buscando escultor con slug:', slug); // Verifica el slug antes de la petición
        try {
            const response = await axios.get(`http://localhost:3001/api/escultores/${slug}`, {
                params: { nombre: slug }
            });
            console.log('Datos del escultor recibidos:', response.data); // Verifica los datos que se reciben
            cards = response.data; // Asegúrate de que cards sea un array, aquí puede ser un solo objeto
        } catch (error) {
            console.log("Error al obtener escultor:", error);
        }
    }
  
    onMount(() => {
      fetchEscultor(slug);
    });
</script>

<article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <header class="text-center">
        <img src={cards.escultorFoto} alt="{cards.escultorName}" class="w-32 h-32 rounded-full mx-auto" />
        <h1 class="text-3xl font-bold mt-4">{cards.escultorName}</h1>
    </header>

    <section class="mt-4">
        <h2 class="text-xl font-semibold">Biografía</h2>
        <p>{cards.content}</p>
    </section>

    <section class="mt-4">
        <h2 class="text-xl font-semibold">Contacto</h2>
        <p>Email: <a href="mailto:{cards.contactoEmail}" class="text-blue-600 hover:underline">{cards.contactoEmail}</a></p>
    </section>
</article>

<style>
    /* Aquí puedes personalizar los estilos */
</style>