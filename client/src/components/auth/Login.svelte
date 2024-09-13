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
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    alt="logo" />
                  <h4 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                    Iniciar Sesión
                  </h4>
                </div>

                <form>
                  
                  <!-- Username input -->
                  <div class="relative mb-4">
                    <input
                      type="text"
                      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                      id="username"
                        placeholder="" />
                    <label
                      for="username"
                      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400">
                      Usuario
                    </label>
                  </div>

                  <!-- Password input -->
                  <div class="relative mb-4">
                    <input
                      type="password"
                      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 pass-color"
                      id="password"
                      placeholder="" />
                    <label
                      for="password"
                      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400">
                      Contraseña
                    </label>
                  </div>

                  <!-- Submit button -->
                  <div class="mb-12 pb-1 pt-1 text-center">
                    <button
                      class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                      type="button"
                      style="
                        background: linear-gradient(to right, #50C9C3, #3F8D87);
                      ">
                      Iniciar sesión
                    </button>

                    <!-- Forgot password link -->
                    <a href="#!">¿Olvidaste tu contraseña?</a>
                  </div>

                  <!-- <!-1- Register button -1-> -->
                  <!-- <div class="flex items-center justify-between pb-6"> -->
                  <!--   <p class="mb-0 me-2">¿No tienes una cuenta?</p> -->
                  <!--   <button -->
                  <!--     type="button" -->
                  <!--     class="inline-block rounded border-2 border-blue-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-blue-500 transition duration-150 ease-in-out hover:bg-blue-100 dark:hover:bg-cyan-950" -->
                  <!--     data-twe-ripple-init> -->
                  <!--     Registrarse -->
                  <!--   </button> -->
                  <!-- </div> -->
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
