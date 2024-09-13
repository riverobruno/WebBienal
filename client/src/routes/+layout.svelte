
<!-- src/routes/+layout.svelte -->
<script>
  // Aquí puedes agregar lógica si es necesario

  import Navbar from '../components/layout/Navbar.svelte';
  import Footer from '../components/layout/Footer.svelte';
</script>

<main>

  <Navbar />
  
  <slot></slot> <!-- Aquí se renderizarán las páginas hijas -->
  
  <Footer />

</main>

<style>
  /* Agrega estilos generales aquí */
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;


:global(body) {
  font-family: 'Roboto', sans-serif;
}

</style>
