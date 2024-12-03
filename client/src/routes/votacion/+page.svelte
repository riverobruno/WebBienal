<script>
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import CryptoJS from "crypto-js"; // Importar la librería

    let rating = 0;
    let userRole;
    let slug;

    $: slug = $page.url.searchParams.get('slug');
    $: [name, code] = slug ? slug.replace(/\/$/, '').split('-') : [null, null];


    function obtenerCodigoValido() {
        // Generar un token único que cambia cada minuto
        const timestamp = Math.floor(Date.now() / 60000); // Cada minuto cambia
        // Concatenar con la clave secreta y hashear
        const hash = CryptoJS.SHA256(`${name}-${timestamp}-desarrollo2024`).toString(CryptoJS.enc.Base64);
        // Tomar los primeros 12 caracteres del hash
        const hashedSlug = hash.substring(0, 12);
        return hashedSlug;
    }

    // Función para actualizar el parámetro basado en la calificación
    /**
     * @param {number} value
     */
    function updateParameter(value) {
        rating = value; // Actualizamos la calificación
    }

    onMount(() => {
    /* // Verifica el rol del usuario
    userRole = localStorage.getItem('role');
    if (!userRole || userRole !== 'usuario') {
        alert('Acceso denegado. Redirigiendo a la página principal.');
        window.location.href = '/inicio';
    }
    let codigoValido = obtenerCodigoValido()
    if (codigoValido != code) {
        alert('Tiempo de votación fuera de término. Por favor volver a escanear el QR');
        window.location.href = '/inicio';
    } */
    });

</script>

<div class="centered-container">
  <div>
    {#each Array(5).fill(0) as _, i}
      <button
        type="button"
        class="star {i < rating ? 'selected' : ''}"
        aria-label="Rate {i + 1} star{(i === 0 ? '' : 's')}"
        on:click={() => updateParameter(i + 1)}
        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && updateParameter(i + 1)}
      >
        ★
      </button>
    {/each}
  </div>

  <p class="rating-text">Valor seleccionado: {rating}</p>
</div>

<style>

  /* Contenedor principal centrado */
  .centered-container {
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center; /* Centrado vertical */
    flex-direction: column; /* Asegura que los elementos se apilen verticalmente */
  }

  .star {
    font-size: 4rem;
    color: gray;
    border: none;
    background: none;
    cursor: pointer;
  }

  .star.selected {
    color: gold;
  }

  .rating-text {
    font-size: 2rem; /* Cambia el tamaño del texto */
    font-weight: bold; /* Puedes hacer el texto más grueso si lo deseas */
  }
</style>