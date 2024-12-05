<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;700&display=swap');

  .video-container {
      position: relative;
      width: 100%;
      max-width: 1920px;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      transition: transform 0.5s ease, box-shadow 0.5s ease;
  }

  .video-container:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .video-container video {
      width: 100%;
      height: auto;
      filter: brightness(0.9) saturate(1.2) contrast(1.1) sepia(0.1);
      transition: filter 0.5s ease;
  }

  .video-container:hover video {
      filter: brightness(1.1) saturate(1.5) contrast(1.3) hue-rotate(15deg);
  }

  .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 100%);
      color: #000000;
      text-align: left;
      padding: 1.5rem;
  }

  .title {
    font-size: 2.8rem; /* Ajustado para ser más refinado */
    font-family: 'Playfair Display', serif;
    font-weight: 600; /* Menos grueso */
    letter-spacing: 0.5px; /* Espacio entre letras */
    margin-bottom: 1rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5); /* Sombra más suave */
}

.subtitle {
    font-size: 1.9rem; /* Ligeramente más pequeño */
    font-family: 'Cormorant Garamond', serif;
    font-weight: 500; /* Ya estilizado */
    line-height: 1.6; /* Más espaciado */
    letter-spacing: 0.3px; /* Espacio entre letras */
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4); /* Sombra más sutil */
}

</style>

<div class="video-container">
  <video autoplay muted loop playsinline>
      <source src="1733168603669-5154d4f9-d6ed-d061-b328-2554ea16a594.mp4" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
  </video>
  <div class="overlay">
      <div class="title">Bienal del Chaco 2024</div>
      <div class="subtitle">Del 13 al 21 de julio</div>
  </div>
</div>
