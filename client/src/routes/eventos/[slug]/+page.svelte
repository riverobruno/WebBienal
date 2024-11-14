<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
    let slug;
    $: slug = $page.params.slug;
    let evento = {}; // Objeto vacío para los datos del evento
    let data = {};
    let obras = []; // Cambié a un array para manejar varias obras

    let mostrandoCarga = true;

    async function fetchEvento(slug) {
        mostrandoCarga = true;
        try {
            const res = await axios.get(`http://localhost:3001/api/eventos/${slug}`, {
                params: { nombre: slug }
            });
            data = res.data;
            evento = data.evento;
            obras = data.obras; // Asigno las obras correctamente
        } catch (error) {
            console.log('Error al obtener el evento:', error);
        }
        mostrandoCarga = false;
    }
    onMount(() => {
        fetchEvento(slug);
    });
    
</script>




<!-- Renderizado de la página de detalle del evento -->
{#if !mostrandoCarga}
    <article class="max-w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg text-center">
        <header>
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
{/if}

<!-- Mostrar el ícono de carga solo cuando mostrandoCarga es true -->
{#if mostrandoCarga}
    <div class="loading-icon"></div>
{:else}
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        <!-- Mostrar las tarjetas solo cuando mostrandoCarga sea false -->
        {#each obras as card}
            <div class="card block bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md">
                <a href={`/obras/${card.obraPantalla}`}>
                    <div class="relative overflow-hidden bg-cover bg-no-repeat">
                        <img class="rounded-t-lg" src={card.obraImage} alt={card.title} />
                        <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                    </div>
                    <div class="p-6 text-surface dark:text-white">
                        <h5 class="mb-2 text-xl font-medium leading-tight text-black">{card.obraName}</h5>
                        <span class="text-cyan-900">
                            <img
                                src={card.obraEscultorFoto}
                                class="w-32 rounded-full"
                                alt="Avatar" />
                            <a href={card.obraEscultor}>{card.obraEscultor}</a>
                        </span>
                        <p class="mb-4 text-base text-left text-black">{card.content}</p>
                        <p class="text-gray-600 text-sm">Fecha de creación: {card.f_creacion}</p>
                    </div>
                </a>
            </div>
        {/each}
    </div>
{/if}

<style>
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

