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

    window.addEventListener('mousemove', mouseHandler);

    return () => {
      window.removeEventListener('mousemove', mouseHandler);
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
