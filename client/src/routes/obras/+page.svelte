<!-- <script>
//    require('dotenv').config();
    import { onMount} from 'svelte';
    import axios from 'axios';

    /**
     * @type {any[]}
     */
    let cards = [];

    onMount(async () => {
        try{
            const res= await axios.get('http://localhost:3002/api/obras')
            console.log(res.data)
            cards=res.data
        } catch (error){
            console.log(error)
        }

    });
    // Ejemplo de datos para las cards
</script> -->

<script>
    // Ejemplo de datos para las cards
    let cards = [
        { id: 1, title: 'Card 1', obraPantalla:'/obra1', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra5', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id: 2, title: 'Card 2', obraPantalla:'/obra2', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra6', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id: 3, title: 'Card 3', obraPantalla:'/obra3', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra3', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id:4, title: 'Card 4', obraPantalla:'/obra4', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra4', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id: 5, title: 'Card 5', obraPantalla:'/obra5', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra5', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id: 6, title: 'Card 6', obraPantalla:'/obra6', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra6', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        { id: 7, title: 'Card 7', obraPantalla:'/obra7', obraImage: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', obraName:'obra6', obraEscultor:'Pablo Picasso', obraEscultorFoto:'src/public/pablopicasso.png', escultorPais:'argentina'},
        // Añade más cards si es necesario
    ];
</script>

<!-- Contenedor de las cards -->
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
    {#each cards as card}
        <div class="block bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md">
            <a href={card.obraPantalla}>
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                <img class="rounded-t-lg" src={card.obraImage} alt={card.title} />

                    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

            </div>
            <div class="p-6 text-surface dark:text-white">
                <h5 class="mb-2 text-xl font-medium leading-tight text-black">{card.obraName}</h5>
                <span class="text-cyan-900"> <img
                        src={card.obraEscultorFoto}
                        class="w-32 rounded-full"
                        alt="Avatar" />
                    <a href={card.obraEscultor}>{card.obraEscultor}</a></span>
                <p class="mb-4 text-base text-left text-black">{card.content}</p>
            </div>
            </a>
        </div>
    {/each}
</div>
