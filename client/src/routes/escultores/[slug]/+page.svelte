<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import axios from "axios";
    import { page } from "$app/stores";
  
    let slug;
    $: slug = $page.params.slug;
  
    let cards = {};
  
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
  
  <article class="escultor-detail-container max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg animate">
    <header class="text-center">
      <img
        src={cards.escultorFoto}
        alt="{cards.escultorName}"
        class="w-32 h-32 rounded-full mx-auto image-style"
      />
      <h1 class="text-3xl font-bold mt-4 text-brown">{cards.escultorName}</h1>
    </header>
  
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-brown">Biografía</h2>
      <p>{cards.content}</p>
    </section>
  
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-brown">Contacto</h2>
      <p>Email: 
        <a href="mailto:{cards.contactoEmail}" class="text-blue-600 hover:underline">{cards.contactoEmail}</a>
      </p>
    </section>
  </article>
  
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
  