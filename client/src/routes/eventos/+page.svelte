<script>
    // Ejemplo de datos para las cards
    let cards = [
        { id: 1, title: 'Card 1', href:'evento1', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
        { id: 2, title: 'Card 2', href:'evento2', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
        { id: 3, title: 'Card 3', href:'evento3', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
        { id: 4, title: 'Card 4', href:'evento4', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
        { id: 5, title: 'Card 5', href:'evento5', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026' },
        { id: 6, title: 'Card 6', href:'evento6', image: 'https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg', content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', eventName:'Evento1', eventStartDate:'01/01/0/2001', eventFinishDate:'01/01/2026'},
        // Añade más cards si es necesario
    ];
</script>

<!-- Contenedor de las cards -->
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
    {#each cards as card}
        <div class="block rounded-lg bg-white shadow-secondary-1 m-2.5 border-2 border-gray-300 rounded-md">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                <img class="rounded-t-lg" src={card.image} alt={card.title} />
                <a href={card.href}>
                    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
            </div>
            <div class="p-6 text-surface dark:text-white">
                <h5 class="mb-2 text-xl font-medium leading-tight text-black">{card.eventName}</h5>
                <span class="text-cyan-900">{card.eventStartDate} - {card.eventFinishDate}</span>
                <p class="mb-4 text-base text-left text-black">{card.content}</p>
            </div>
        </div>
    {/each}
</div>

