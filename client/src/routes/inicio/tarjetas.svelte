<script>
    const tarjetas = [
        { 
            nombre: "Ejemplo 1", 
            lugar: "Otra Ciudad", 
            bandera: "https://flagcdn.com/w320/ar.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 2", 
            lugar: "Otra Ciudad", 
            bandera: "https://flagcdn.com/w320/br.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 3", 
            lugar: "Ciudad 3", 
            bandera: "https://flagcdn.com/w320/us.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 4", 
            lugar: "Ciudad 4", 
            bandera: "https://flagcdn.com/w320/fr.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 5", 
            lugar: "Ciudad 5", 
            bandera: "https://flagcdn.com/w320/it.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 6", 
            lugar: "Ciudad 6", 
            bandera: "https://flagcdn.com/w320/de.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 7", 
            lugar: "Ciudad 7", 
            bandera: "https://flagcdn.com/w320/jp.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 8", 
            lugar: "Ciudad 8", 
            bandera: "https://flagcdn.com/w320/kr.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 9", 
            lugar: "Ciudad 9", 
            bandera: "https://flagcdn.com/w320/au.png", 
            imagen: "pablopicasso.png" 
        },
        { 
            nombre: "Ejemplo 10", 
            lugar: "Ciudad 10", 
            bandera: "https://flagcdn.com/w320/ca.png", 
            imagen: "pablopicasso.png" 
        }
    ];
</script>

<style>
    .contenedor {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 5 tarjetas por fila */
        gap: 30px; /* Incrementa el espacio entre tarjetas */
        justify-content: center;
        padding: 16px;
    }

    .tarjeta {
        width: 180px;
        height: 300px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .imagen {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .bandera {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .contenido {
        padding: 8px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .nombre {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
    }

    .lugar {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
    }

    .boton {
        align-self: center;
        padding: 8px 12px;
        background-color: black;
        color: white;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .boton:hover {
        background-color: #444;
    }
</style>

<div class="contenedor">
    {#each tarjetas as tarjeta}
        <div class="tarjeta">
            <img src={tarjeta.imagen} alt="Foto de {tarjeta.nombre}" class="imagen" />
            <img src={tarjeta.bandera} alt="Bandera de {tarjeta.lugar}" class="bandera" />
            <div class="contenido">
                <div class="nombre">{tarjeta.nombre}</div>
                <div class="lugar">{tarjeta.lugar}</div>
                <button class="boton">Ver</button>
            </div>
        </div>
    {/each}
</div>

