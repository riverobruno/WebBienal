<script>
    import { onMount } from 'svelte';
  
    let userRole;
    let accesoPermitido = false; // Variable para controlar el acceso
  
    onMount(() => {
      userRole = localStorage.getItem('role');
      
      // Verifica si el usuario tiene el rol adecuado
      if (userRole === 'admin') {
        accesoPermitido = true; // Permite el acceso si es administrador
      } else {
        alert('Acceso denegado. Redirigiendo a la página principal.');
        window.location.href = '/inicio';
      }
    });
  </script>
  
  {#if accesoPermitido}
    <section>
      <h1>Bienvenido, Administrador</h1>
      <p>Este es el panel exclusivo para administradores. Aquí puedes gestionar los usuarios y las configuraciones del sistema.</p>
    </section>
  {/if}
  