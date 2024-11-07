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
            const response = await axios.get(`http://localhost:3001/api/obras/${slug}`, { // Cambia la ruta a '/api/obras'
                params: { nombre: slug }
            });
            console.log("Datos de la obra recibidos:", response.data); // Verifica los datos que se reciben
            obra = response.data;
        } catch (error) {
            console.log("Error al obtener la obra:", error);
        }
    }
    
    onMount(() => {
        fetchObra(slug);
    });
</script>

<!-- Renderizado de la página de detalle de la obra -->
<article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <header class="text-center">
        <img src={obra.obraImage} alt="{obra.title}" class="w-full h-64 object-cover rounded-t-lg" /> <!-- Cambia obraImage a obra.imagen -->
        <h1 class="text-3xl font-bold mt-4">{obra.obraName}</h1> <!-- Cambia obraName a obra.nombre -->
    </header>

    <section class="mt-4">
        <h2 class="text-xl font-semibold">Técnica</h2>
        <p>{obra.content}</p> <!-- Muestra la técnica de la obra -->
    </section>

    <section class="mt-4">
        <h2 class="text-xl font-semibold">Antecedente</h2>
        <p>{obra.antecedente}</p> <!-- Muestra el antecedente de la obra -->
    </section>
</article>

<style>
    /* Personaliza los estilos para la página de detalle de cada obra */
</style>