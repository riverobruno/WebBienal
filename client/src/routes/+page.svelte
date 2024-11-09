<script>
    import {onMount} from 'svelte'
    import { goto } from '$app/navigation'
    onMount(() => {
        goto('/login') // Dentro de él se trata la redirección en caso de estar iniciada la sesión.
    });

</script>


