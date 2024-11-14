<script>
    import { onMount } from 'svelte';
    import axios from "axios";
  
    let userRole;
    let accesoPermitido = false; // Variable para controlar el acceso
    let artista = {}; // Información del artista que ha iniciado sesión
    let obraReciente = {};


  
    onMount(() => {
      userRole = localStorage.getItem('role');
      
      // Verifica si el usuario tiene el rol adecuado
      if (userRole === 'escultor') {
        accesoPermitido = true; // Permite el acceso si es escultor
      } else {
        alert('Acceso denegado. Redirigiendo a la página principal.');
        window.location.href = '/inicio';
      }
    });
    
    async function fetchArtista() {
    const token = localStorage.getItem('token');
    const email = token ? decodificarToken(token).correo : '';

    try {
      const response = await axios.get(`http://localhost:3001/api/artista/${email}`);
      
      if (response.data.success) {
        artista = response.data.artista;
        obraReciente = response.data.obraReciente; // Asegúrate de asignar obraReciente
      } else {
        console.error('No se encontraron datos del artista');
      }
    } catch (error) {
      console.error("Error al obtener el artista:", error);
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

  onMount(() => {
    fetchArtista();
  });
</script>

  
  {#if accesoPermitido}
  <article class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
    <header class="text-center">
      <img src={artista.URL_foto || ''} alt="{artista.nombre || 'Foto del Artista'}" class="w-32 h-32 rounded-full mx-auto" />
      <h1 class="text-3xl font-bold mt-4">{artista.nombre || 'Nombre no disponible'}</h1>
    </header>
  
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Biografía</h2>
      <p>{artista.biografia || 'Biografía no disponible'}</p>
    </section>
  
    <section class="mt-4">
      <h2 class="text-xl font-semibold">Contacto</h2>
      <p>Email: <a href="mailto:{artista.contacto || '#'}" class="text-blue-600 hover:underline">{artista.contacto || 'No disponible'}</a></p>
    </section>
  
    {#if obraReciente}
      <section class="mt-4">
        <h2 class="text-xl font-semibold">Obra Más Reciente</h2>
        <p><strong>Nombre de la Obra:</strong> {obraReciente.nombre || 'No disponible'}</p>
        <p><strong>Fecha de Creación:</strong> {obraReciente.fechaCreacion || 'No disponible'}</p>
        <p><strong>Técnica:</strong> {obraReciente.tecnica || 'No disponible'}</p>
        {#if obraReciente.imagenURL}
          <img src={obraReciente.imagenURL} alt="Imagen de la obra reciente" class="mt-4" />
        {/if}
      </section>
    {/if}
  </article>
  
  {/if}
  