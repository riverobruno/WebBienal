<script>
    import {onMount} from 'svelte'
    import { goto } from '$app/navigation'
    onMount(() => {
        goto('/login') // Sin query al principio
    });

</script>


