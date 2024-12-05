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

    /* Estilo de texto con gradiente más oscuro y sombras más sutiles */
  .styled-text {
    display: inline-block;
    background: linear-gradient(45deg, #4b4a7d, #6b63ff, #4b4a7d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientMove 3s infinite linear;
    text-shadow: 
      1px 1px 2px rgba(50, 50, 50, 0.6),
      -1px -1px 2px rgba(0, 0, 0, 0.4);
  }

  /* Animación del gradiente */
  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  </style>
  
  <div class="video-container">
    <video autoplay muted loop playsinline>
      <source src="video_inicio.mp4" type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
    <div class="overlay" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="display: flex; flex-wrap: wrap; width: 100%; align-items: center;">
          <!-- Título principal -->
          <div style="flex: 1; min-width: 200px;">
            <div style="flex: 1; min-width: 200px; text-align: left;">
              <div class="title" style="
                  font-size: 3rem; 
                  font-family: 'Georgia', serif; 
                  font-weight: 300; 
                  font-style: italic; 
                  color: white; 
                  line-height: 1.2; 
                  letter-spacing: 0.5px;">
                Bienal del Chaco <span style="font-weight: 400;">2024</span>
              </div>
              <div class="subtitle" style="
                  font-size: 2rem; 
                  font-family: 'Georgia', serif; 
                  font-weight: 300; 
                  font-style: italic; 
                  color: white; 
                  line-height: 1.5; 
                  letter-spacing: 0.5px;
                  margin-top: 10px;">
                del 13 al 21 de <span style="font-weight: 400;">Julio</span>
              </div>
              <div class="subtitle" style="
                font-size: 2rem; 
                font-family: 'Georgia', serif; 
                font-weight: 300; 
                font-style: italic; 
                line-height: 1.5; 
                letter-spacing: 0.5px; 
                margin-top: 10px;
                position: relative;
                text-align: left;">
            <span class="styled-text">
                Universos Entretejidos
            </span>
            </div>

            </div>
      
            <div>
              <img 
                src="https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/02/b24-slide-principal-nuevo-logo-gobierno.png" 
                alt="Logo Gobierno del Chaco" 
                style="
                  display: block; 
                  margin-top: 10px; 
                  width: auto; 
                  height: 3rem; /* Aumenté la altura */
                  max-height: 60px; /* Aumenté el límite máximo */
                  object-fit: contain; 
                  filter: brightness(1.2) contrast(1.1) saturate(1.5);" 
              />
            </div>
          </div>
      </div>      
    </div>
</div>
  
  
  