<script>
  import { onMount } from 'svelte';
  import Caras from './caras.svelte';
  import Esfera from './esfera.svelte';
  import Robo from './robo.svelte';
  import OuterWilds from './outerwilds.svelte';

  let sections;
  let isScrolling = false;
  let lastHoveredSection = null;

  onMount(() => {
    sections = document.querySelectorAll('.full-page');

    const scrollToSection = (section) => {
      if (isScrolling || !section) return;

      isScrolling = true;
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setTimeout(() => {
        isScrolling = false;
      }, 800); // Tiempo de espera para evitar scrolls repetidos
    };

    const mouseHandler = (event) => {
      if (isScrolling) return;

      // Detectar en qué sección está el mouse
      const hoveredSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return (
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom &&
          event.clientX >= rect.left &&
          event.clientX <= rect.right
        );
      });

      // Si cambia de sección, desplazarse
      if (hoveredSection && hoveredSection !== lastHoveredSection) {
        lastHoveredSection = hoveredSection;
        scrollToSection(hoveredSection);
      }
    };

    const touchHandler = (event) => {
      const touch = event.changedTouches[0];
      mouseHandler({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    };

    window.addEventListener('mousemove', mouseHandler);
    window.addEventListener('touchmove', touchHandler);

    return () => {
      window.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('touchmove', touchHandler);
    };
  });
</script>

<style>
  body {
    margin: 0;
    overflow: hidden; /* Evitar el scroll manual */
  }

  .container {
    display: flex;
    flex-direction: column;
    scroll-snap-type: y mandatory; /* Forzar que las secciones se alineen */
  }

  .full-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start; /* Alinear las secciones al inicio */
    overflow: hidden;
    background: #f0f0f0;
  }

  /* Media Queries para diseño responsive */
  @media (max-width: 768px) {
    .full-page {
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    .full-page {
      height: auto; /* Permitir que el contenido se ajuste */
      width: 100vw;
      padding: 10px;
    }
  }
</style>

<div class="container">
  <div class="full-page">
    <Caras />
  </div>

  <div class="full-page">
    <Esfera />
  </div>

  <div class="full-page">
    <Robo />
  </div>

  <div class="full-page">
    <OuterWilds />
  </div>
</div>
