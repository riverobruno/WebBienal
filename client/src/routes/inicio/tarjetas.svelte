<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import "flag-icons/css/flag-icons.min.css";
    /**
     * @type {any[]}
     */
  let cards = []; // Resultado de las esculturas
  
  // Función para realizar la búsqueda
  async function fetchEscultores() {
    try {
      const res = await axios.get(`http://localhost:3001/api/escultores`, {
        params: {
          search: "",
          sortBy: "promedio",
          order: "DESC"
        }
      });
      cards = res.data.slice(0,10);
      console.log(cards)
    } catch (error) {
      console.log(error);
    }
  }

  // Ejecutar la consulta inicial cuando se monta la página
  onMount(() => {
    fetchEscultores(); // Sin query al principio
  });
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

    .correo {
        font-size: 14px;
        color: #666;
        margin-bottom: 0px;
    }
    
    .fi {
        position: absolute;
        top: 5px; /* Ajusta según el espacio que quieras desde la parte superior */
        left: 5px; /* Ajusta según el espacio que quieras desde la parte izquierda */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;  /* Ajusta el tamaño del ícono */
    }
</style>

<div class="contenedor">
    {#each cards as tarjeta}
        <div class="tarjeta">
            <div class="imagen-container">
                <img src={tarjeta.escultorFoto} alt="Foto de {tarjeta.escultorName}" class="imagen" />
                <span class={`fi fi-${tarjeta.nacionalidad}`}></span>
            </div>
            <div class="contenido">
                <div class="nombre">{tarjeta.escultorName}</div>
                <div class="correo">{tarjeta.contactoEmail}</div>
            </div>
        </div>
    {/each}
</div>

