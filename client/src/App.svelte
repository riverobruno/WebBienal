<script>
// @ts-nocheck

    import SignUp from './routes/registrarse/+page.svelte';
    import userbase from 'userbase-js';
    /**
     * @type {import("userbase-js").UserResult | null | undefined}
     */
    let user=null
    let initPromise=userbase.init({ appId:'1deb3875-f9f0-4080-935b-13a1ce3f75e9'})
        .then((session)=>user=session.user)
    function signOut(){
        initPromise=userbase.signOut().then(()=>user=null)
    }


</script>
<div class="container flex justify-center items-center h-screen w-screen mx-auto">
    {#await initPromise}
        Cargando...
    {:then _}
        {#if !user}
            <SignUp bind:user bind:initPromise/>
        {:else}
            <button
            class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
            type="button"
            style="background: linear-gradient(to right, #50C9C3, #3F8D87);"
            on:click={signOut}>
            cerrar sesión
      </button>
        {/if}   
    {/await}

</div>
