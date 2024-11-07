<section

  class="gradient-form h-full dark:bg-neutral-700 mx-auto my-auto"
>
  <div class="container h-full px-80 mx-auto"
  >
    <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div class="w-full">
        <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800"
        >
          <div class="g-0 lg:flex lg:flex-wrap">
            <!-- Columna izquierda -->
            <div class="px-4 md:px-0 lg:w-6/12">
              <div class="md:mx-6 md:p-12">
                <!-- Logo -->
                <div class="text-center">
                  <img
                  class="mx-auto w-48"
                  src="https://raw.githubusercontent.com/FRRe-DS/2024-06-TPI/main/client/src/public/bienal_logo.png"
                  alt="logo"
                  style="filter: invert(1);" />


                  <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                    Iniciar Sesión
                  </h4>
                </div>

                <form>
                  <!-- Username input -->
                  <div class="relative mb-4">
                    <input
                      type="text"
                      id="username"
                      placeholder="Correo"
                      class="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 peer-focus:text-primary dark:text-white dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                      bind:value={correo} />
                  </div>
                
                  <!-- Password input -->
                  <div class="relative mb-4">
                    <input
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                      class="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 peer-focus:text-primary dark:text-white dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                      bind:value={contraseña} />
                  </div>
                
                  <!-- Submit button -->
                  <div class="mb-12 pb-1 pt-1 text-center">
                    <button
                      class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                      type="button"
                      style="background: linear-gradient(to right, #50C9C3, #3F8D87);"
                      on:click={iniciarSesion}>
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Columna derecha con fondo de gradiente -->
            <div
              class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
              style="background: linear-gradient(to right, #50C9C3, #3F8D87)">
              <div class="px-4 py-6 text-white md:mx-6 md:p-12">
                <h4 class="mb-6 text-xl font-semibold">
                  Somos más que una empresa
                </h4>
                <p class="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<style>
  /* Modo oscuro: gradiente azul a cian */
  @media (prefers-color-scheme: dark) {
    section.gradient-form .lg\:rounded-e-lg {
      background: linear-gradient(to right, #0066cc, #00bcd4);
    }
    button {
      background: linear-gradient(to right, #0066cc, #00bcd4);
    }
  }



.pass-color {
  color: #3F8D87;

  }

</style>

<script>
  let correo = '';
  let contraseña = '';

  // Verificar si el usuario ya tiene una sesión activa
  if (localStorage.getItem('token')) {
      // Redirigir al home si ya hay una sesión activa
      window.location.href = '/inicio';
  }

  const iniciarSesion = async () => {
    if (!correo || !contraseña) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo: correo,
                contraseña: contraseña,
            }),
        });

        const data = await response.json();

        if (data.success && data.token) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token); // Almacena el token en localStorage
            window.location.href = '/home'; // Redirige a la página principal
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Hubo un error al intentar iniciar sesión');
    }
};
</script>
