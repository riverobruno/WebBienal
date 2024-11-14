<script>
  import { onMount } from 'svelte';

  let artista = null;
  let obraReciente = null;
  let puntuacion = 0;
  let userRole;

  onMount(() => {
    // Verifica el rol del usuario
    userRole = localStorage.getItem('role');

    if (userRole !== 'usuario') {
      alert('Acceso denegado. Redirigiendo a la página principal.');
      window.location.href = '/inicio';
    } else {
      obtenerArtistaYObra();
    }
  });

  async function obtenerArtistaYObra() {
    const token = localStorage.getItem('token');
    const email = token ? decodificarToken(token).correo : '';

    try {
      const response = await fetch(`http://localhost:3001/api/artista/${email}`);
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.success) {
        artista = data.artista;
        obraReciente = data.obraReciente;
      } else {
        console.error('No se encontraron datos del artista o la obra');
      }
    } catch (error) {
      console.error('Error al obtener los datos del artista:', error);
    }
  }

  function decodificarToken(token) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  function votar() {
    // Aquí harías la solicitud para enviar el voto al backend
    console.log(`Votando con puntuación: ${puntuacion}`);
  }
</script>

{#if userRole === 'usuario'}
  <div class="full-page">
    <h2>Información del Artista</h2>
    <p><strong>Nombre:</strong> {artista ? artista.nombre : 'undefined'}</p>
    <p><strong>DNI:</strong> {artista ? artista.dni : 'undefined'}</p>
    <p><strong>Biografía:</strong> {artista ? artista.biografia : 'undefined'}</p>

    <h2>Obra Más Reciente</h2>
    <p><strong>Nombre de la Obra:</strong> {obraReciente ? obraReciente.nombre : 'undefined'}</p>
    <p><strong>Fecha de Creación:</strong> {obraReciente ? obraReciente.fechaCreacion : 'undefined'}</p>
    <p><strong>Técnica:</strong> {obraReciente ? obraReciente.tecnica : 'undefined'}</p>
    {#if obraReciente && obraReciente.imagenURL}
      <img src={obraReciente.imagenURL} alt="Imagen de la obra reciente" />
    {/if}

    <h2>Votar por esta Obra</h2>
    <label for="puntuacion">Puntuación (1-5 estrellas):</label>
    <select bind:value={puntuacion} id="puntuacion">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button on:click={votar}>Votar</button>
  </div>
{/if}

<style>
  .full-page {
    padding: 20px;
  }
  img {
    max-width: 200px;
    height: auto;
    margin-top: 10px;
  }
</style>
