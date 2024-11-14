<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
    let slug;
    $: slug = $page.params.slug;
    let escultor = {}; // Objeto vacío para los datos del escultor
    let data = {};
    let obras = []; // Cambié a un array para manejar varias obras
    async function fetchEscultor(slug) {
        try {
            const response = await axios.get(`http://localhost:3001/api/escultores/${slug}`, {
                params: { nombre: slug }
            });
            data = response.data;
            escultor = data.escultor;
            obras = data.obras; // Asigno las obras correctamente
        } catch (error) {
            console.log("Error al obtener escultor:", error);
        }
    }
  
    onMount(() => {
      fetchEscultor(slug);
    });
  </script>
  
  <article class="escultor-detail-container max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg animate">
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
<!-- Contenedor de las obras -->
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
    {#each obras as card}
        <div class="card block bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md">
            <a href={`/obras/${card.obraPantalla}`}>
                <div class="relative overflow-hidden bg-cover bg-no-repeat">
                    <img class="rounded-t-lg" src={card.obraImage} alt={card.title} />
                    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </div>
                <div class="p-6 text-surface dark:text-white">
                    <h5 class="mb-2 text-xl font-medium leading-tight text-black">{card.obraName}</h5>
                    <p class="mb-4 text-base text-left text-black">{card.content}</p>
                    <p class="text-gray-600 text-sm">Fecha de creación: {card.f_creacion}</p>
                </div>
            </a>
        </div>
    {/each}
</div>
<style>
    /* Estilos generales */
    .escultor-detail-container {
      background-color: #f9f9f9;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    /* Animación de entrada */
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
      animation: fadeIn 0.5s ease-in-out forwards;
    }
  
    /* Estilos de imagen con bordes suaves */
    .image-style {
      border-radius: 50%;
      box-shadow: 0 4px 15px rgba(113, 51, 7, 0.4);  /* Sombra difusa marrón */
      border: 2px solid rgba(113, 51, 7, 0.2);  /* Borde suave con color marrón */
    }
  
    h1 {
      font-family: 'Arial', sans-serif;
      color: #713307;
    }
  
    /* Títulos y texto */
    h2 {
      color: #86512c;
      font-weight: bold;
    }
  
    p {
      color: #4a4a4a;
      font-size: 1rem;
      line-height: 1.6;
      margin-top: 10px;
    }
  
    /* Color personalizado marrón */
    .text-brown {
      color: #86512c;
    }
  
    /* Enlaces */
    a {
      color: #713307;
    }
  
    a:hover {
      text-decoration: underline;
      color: #86512c;
    }
  </style>