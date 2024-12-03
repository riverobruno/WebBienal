<script>
  import { onMount } from 'svelte';
  import Caras from './caras.svelte';
  import Esfera from './esfera.svelte';
  import Megamind from './megamind.svelte';
  import Robo from './robo.svelte';
  import OuterWilds from './outerwilds.svelte';
  import Navbar from '../../components/layout/Navbar.svelte';

  let sections;

  onMount(() => {
    // Crear un evento de scroll controlado
    let currentSection = 0;
    let isScrolling = false;

    const scrollHandler = (event) => {
      if (isScrolling) return; // Evitar scroll excesivo
      isScrolling = true;

      if (event.deltaY > 0) {
        // Scroll hacia abajo
        currentSection = Math.min(currentSection + 1, sections.length - 1);
      } else {
        // Scroll hacia arriba
        currentSection = Math.max(currentSection - 1, 0);
      }

      sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setTimeout(() => (isScrolling = false), 800); // Evitar múltiples eventos durante el scroll
    };

    window.addEventListener('wheel', scrollHandler);
    sections = document.querySelectorAll('.full-page');

    return () => {
      window.removeEventListener('wheel', scrollHandler);
    };
  });
</script>

<style>
  body {
    margin: 0;
    overflow: hidden; /* Evitar que el scroll se vea */
  }

  .container {
    display: flex;
    flex-direction: column;
    scroll-snap-type: y mandatory; /* Asegura el snap entre secciones */
  }

  .full-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start; /* Asegura que las secciones se alineen al inicio */
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
    <Megamind />
  </div>

  <div class="full-page">
    <OuterWilds />
  </div>
</div>
