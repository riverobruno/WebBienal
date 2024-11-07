<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
    let slug;
    $: slug = $page.params.slug;
    let evento = {}; // Objeto vacío para los datos del evento
    async function fetchEvento(slug) {
        try {
            const response = await axios.get(`http://localhost:3001/api/eventos/${slug}`);
            evento = response.data;
        } catch (error) {
            console.log("Error al obtener el evento:", error);
        }
    }
    onMount(() => {
        fetchEvento(slug);
    });
</script>
<!-- Renderizado de la página de detalle del evento -->
<article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <header class="text-center">
        <h1 class="text-3xl font-bold mt-4">{evento.eventName}</h1>
    </header>
    <section class="mt-4">
        <h2 class="text-xl font-semibold">Detalles del Evento</h2>
        <p><strong>Fecha de inicio:</strong> {evento.eventStartDate}</p>
        <p><strong>Fecha de fin:</strong> {evento.eventFinishDate}</p>
        <p><strong>Hora:</strong> {evento.startTime} - {evento.finishTime}</p>
        <p><strong>Ubicación:</strong> {evento.location}</p>
        <p class="mt-4">{evento.content}</p>
    </section>
</article>