<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import QRCode from 'qrcode';

  let artista = null;
  let obraReciente = null;
  let puntuacion = 0;
  let userRole;

  let qrCodeDataUrl = '';
  
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
          
          if (!response.ok) throw new Error('Error en la respuesta del servidor');

          const data = await response.json();

          if (data.success) {
              artista = data.artista;
              obraReciente = data.obraReciente;
              const enlaceVotacion = `votacion/${artista.nombre.replace(/\s+/g, '')}`;
              generarQRCode(enlaceVotacion);
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
  async function generarQRCode(url) {
      try {
          qrCodeDataUrl = await QRCode.toDataURL(url);
      } catch (error) {
          console.error('Error al generar el código QR:', error);
      }
  }

</script>

<div class="full-page">
  <div class="content animate">
      <div class="artist-details">
          <h2>Información del Artista</h2>
          <p><strong>Nombre:</strong> {artista ? artista.nombre : 'undefined'}</p>
          <p><strong>DNI:</strong> {artista ? artista.dni : 'undefined'}</p>
          <p><strong>Biografía:</strong> {artista ? artista.biografia : 'undefined'}</p>

          <h2>Obra Más Reciente</h2>
          <p><strong>Nombre de la Obra:</strong> {obraReciente ? obraReciente.nombre : 'undefined'}</p>
          <p><strong>Fecha de Creación:</strong> {obraReciente ? obraReciente.fechaCreacion : 'undefined'}</p>
          <p><strong>Técnica:</strong> {obraReciente ? obraReciente.tecnica : 'undefined'}</p>
          {#if obraReciente && obraReciente.imagenURL}
              <img src={obraReciente.imagenURL} alt="Imagen de la obra reciente" class="art-image" />
          {/if}
      </div>

      <div class="qr-section">
          <h2>Código QR para votar</h2>
          {#if qrCodeDataUrl}
              <img src={qrCodeDataUrl} alt="Código QR para votar" class="qr-code" />
          {/if}
      </div>
  </div>
</div>

<style>
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

  .full-page {
      display: flex;
      justify-content: center;
      padding: 20px;
      font-family: Arial, sans-serif;
  }

  .content {
      display: flex;
      gap: 30px;
      animation: fadeIn 0.5s ease forwards;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .artist-details {
      flex: 1;
  }

  .artist-details h2 {
      color: #86512c;
      margin-bottom: 10px;
  }

  .artist-details p {
      font-size: 16px;
      color: #333;
      margin: 5px 0;
  }

  .art-image {
      max-width: 100%;
      max-height: 300px;
      height: auto;
      border-radius: 8px;
      margin-top: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 200px;
  }

  .qr-section h2 {
      font-size: 18px;
      color: #86512c;
      text-align: center;
      margin-bottom: 10px;
  }

  .qr-code {
      width: 300px;
      height: auto;
      margin-top: 10px;
  }
</style>
