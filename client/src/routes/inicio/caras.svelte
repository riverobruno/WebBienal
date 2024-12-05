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
        filter: brightness(0.7) saturate(1.1) contrast(1) sepia(0.05);
        transition: filter 0.5s ease;
        transform: translateZ(0);
    }
  
    .video-container:hover video {
        filter: brightness(0.8) saturate(1.2) contrast(1.1) hue-rotate(15deg);
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
        color: #ffffff;
        text-align: left;
        padding: 1.5rem;
    }
  
    .title {
        font-size: 2.8rem;
        font-family: 'Playfair Display', serif;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    }
  
    .subtitle {
        font-size: 1.9rem;
        font-family: 'Cormorant Garamond', serif;
        font-weight: 500;
        line-height: 1.6;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    }
  
    /* Media Queries para hacer el diseño responsive */
    @media (max-width: 1024px) {
        .title {
            font-size: 2.4rem;
        }
  
        .subtitle {
            font-size: 1.6rem;
        }
  
        .overlay {
            padding: 1rem;
        }
    }
  
    @media (max-width: 768px) {
        .title {
            font-size: 2rem;
            margin-bottom: 0.8rem;
        }
  
        .subtitle {
            font-size: 1.4rem;
        }
  
        .overlay {
            padding: 0.8rem;
            align-items: center; /* Centrar el texto */
            text-align: center; /* Ajustar el texto al centro */
        }
    }
  
    @media (max-width: 480px) {
        .title {
            font-size: 1.6rem;
        }
  
        .subtitle {
            font-size: 1.2rem;
        }
  
        .overlay {
            padding: 0.5rem;
        }
    }
  </style>
  
  <div class="video-container">
    <video autoplay muted loop playsinline>
        <source src="video_inicio.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
    </video>
    <div class="overlay">
        <div class="title">Bienal del Chaco 2024</div>
        <div class="subtitle">Del 13 al 21 de julio</div>
    </div>
  </div>
  