<!-- src/routes/inicio/+page.svelte -->
<script>
  import fondo from '$lib/../public/inicio.png'
</script>

<style>
  .full-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }

  .background-image {
    height: 100vh;            /* La imagen ocupa toda la altura */
    width: auto;              /* Ajusta automáticamente el ancho */
    object-fit: cover;        /* Ajusta para que no pierda proporción */
    object-position: calc(100% - 50%) center; /* Mueve un 20% a la izquierda desde la derecha */
    }

</style>

<div class="full-page">
  <img src={fondo} alt="Fondo de pantalla" class="background-image" />
</div>