<script>
  import { page } from "$app/stores";
  let slug = $page.url.searchParams.get("slug");
</script>

<article
  class="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg text-center"
>
  <h1 class="text-3xl font-bold">Bienvenido seas</h1>
  <p class="mt-4">Estás votando por la obra con el identificador: {slug}</p>
</article>

<style>
  .max-w-xl {
    max-width: 600px;
  }
</style>
