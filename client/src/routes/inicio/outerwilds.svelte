<script>
    let videoSource = "outerwilds.mp4";
</script>

<style>
    .video-container {
        position: relative;
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
        transition: transform 0.5s ease, box-shadow 0.5s ease;
    }

    .video-container:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
    }

    .video-container video {
        width: 100%;
        height: auto;
        filter: brightness(0.8) contrast(1.2) saturate(1.1);
        transition: filter 0.5s ease;
        transform: translateZ(0); /* Activa la aceleración por hardware */

    }

    .video-container:hover video {
        filter: brightness(1) contrast(1.4) saturate(1.3);
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
        align-items: center;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1) 100%);
        color: #fff;
        text-align: center;
        padding: 2rem;
        font-family: 'Orbitron', sans-serif;
        animation: fadeIn 2s ease-in-out;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .title {
        font-size: 3.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #00d4ff;
        text-shadow: 0 0 20px #00d4ff, 0 0 30px #00aaff;
        animation: slideIn 1.5s ease-out;
    }

    @keyframes slideIn {
        0% {
            transform: translateY(-50%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .subtitle {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.5;
        color: #d1e9ff;
        text-shadow: 0 0 10px #0077ff, 0 0 20px #0057ff;
        animation: slideIn 2s ease-out;
        animation-delay: 0.5s;
    }

    @keyframes starTwinkle {
        0%, 100% {
            text-shadow: 0 0 10px #fff, 0 0 20px #ffef00;
        }
        50% {
            text-shadow: 0 0 15px #fff, 0 0 30px #ffef00;
        }
    }

    .title, .subtitle {
        animation: starTwinkle 3s infinite;
    }
</style>

<div class="video-container">
    <video autoplay muted loop playsinline>
        <source src={videoSource} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
    </video>
    <div class="overlay">
        <div class="title">Explora el Cosmos</div>
        <div class="subtitle">
            Es un orgullo para nosotros, los chaqueños, haber construido un acontecimiento internacional de reconocimiento pleno en la escena escultórica mundial. Grandes escultores del mundo en escena y en acción, trabajando a cielo abierto y en público, esculpiendo piezas que tienen por destino las veredas de Resistencia. Y así se cierra el círculo virtuoso: la obra de arte que pasa a formar parte del paisaje cotidiano haciendo del arte un bien de todos.
        </div>
    </div>
</div>