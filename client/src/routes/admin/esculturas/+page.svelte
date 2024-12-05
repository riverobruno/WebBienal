<script>
    import { onMount } from 'svelte';
  
    let userRole;
    let accesoPermitido = false;
  
    onMount(() => {
      userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
        accesoPermitido = true;
      } else {
        alert('Acceso denegado. Redirigiendo a la página principal.');
        window.location.href = '/inicio';
      }
    });
  
    let artistas = [];
    let eventos = [];
    let nombre = '';
    let fechaCreacion = '';
    let tecnica = '';
    let antecedentes = '';
    let artistasSeleccionados = [];
    let eventosSeleccionados = [];
    let imagenes = [];
    let filtroArtistas = ''; // Para filtrar artistas
    let filtroEventos = ''; // Para filtrar eventos
    let mostrarArtistas = false; // Controla la visibilidad del menú de artistas
    let mostrarEventos = false; // Controla la visibilidad del menú de eventos
  
    onMount(async () => {
      artistas = await fetchArtistas();
      eventos = await fetchEventos();
    });
  
    async function fetchArtistas() {
      return ['Artista 1', 'Artista 2', 'Artista 3', 'Artista 4', 'Artista 5', 'Artista 6'];
    }
  
    async function fetchEventos() {
      return ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4', 'Evento 5', 'Evento 6'];
    }
  
    function handleFileChange(event) {
      imagenes = Array.from(event.target.files);
    }
  
    function seleccionarArtista(artista) {
      if (!artistasSeleccionados.includes(artista)) {
        artistasSeleccionados = [...artistasSeleccionados, artista];
      }
      filtroArtistas = ''; // Limpiar el filtro
    }
  
    function seleccionarEvento(evento) {
      if (!eventosSeleccionados.includes(evento)) {
        eventosSeleccionados = [...eventosSeleccionados, evento];
      }
      filtroEventos = ''; // Limpiar el filtro
    }
  
    function eliminarArtista(artista) {
      artistasSeleccionados = artistasSeleccionados.filter(a => a !== artista);
    }
  
    function eliminarEvento(evento) {
      eventosSeleccionados = eventosSeleccionados.filter(e => e !== evento);
    }
  
    function enviarFormulario() {
      const data = {
        nombre,
        fechaCreacion,
        tecnica,
        antecedentes,
        artistasSeleccionados,
        eventosSeleccionados,
        imagenes,
      };
      console.log('Formulario enviado:', data);
      alert('Datos enviados con éxito');
    }
  </script>
  
  {#if accesoPermitido}
    <section>
      <h1>Registrar Escultura</h1>
      <form on:submit|preventDefault={enviarFormulario} class="formulario">
        <div class="campo">
          <label for="nombre">Nombre de la escultura</label>
          <input type="text" id="nombre" bind:value={nombre} required />
        </div>
  
        <div class="campo">
          <label for="fechaCreacion">Fecha de creación</label>
          <input type="date" id="fechaCreacion" bind:value={fechaCreacion} required />
        </div>
  
        <div class="campo">
          <label for="tecnica">Técnica</label>
          <input type="text" id="tecnica" bind:value={tecnica} required />
        </div>
  
        <div class="campo">
          <label for="antecedentes">Antecedentes</label>
          <textarea id="antecedentes" bind:value={antecedentes} rows="4" required></textarea>
        </div>
  
        <!-- Artistas seleccionados -->
        <div class="campo">
          <label>Artistas seleccionados:</label>
          <ul>
            {#each artistasSeleccionados as artista}
              <li>
                {artista} 
                <button type="button" class="btn-cruz" on:click={() => eliminarArtista(artista)}>✖</button>
              </li>
            {/each}
          </ul>
        </div>
  
        <!-- Buscar y agregar artistas -->
        <div class="campo">
          <label for="artistasSeleccionados">Buscar Artista</label>
          <div class="buscador">
            <input
              type="text"
              placeholder="Buscar artista..."
              bind:value={filtroArtistas}
              on:focus={() => (mostrarArtistas = true)}
            />
            <button type="button" class="btn-toggle" on:click={() => (mostrarArtistas = !mostrarArtistas)}>
              {mostrarArtistas ? '▲' : '▼'}
            </button>
          </div>
          {#if mostrarArtistas}
            <select
              id="artistasSeleccionados"
              bind:value={filtroArtistas}
              size="5"
              on:change={() => seleccionarArtista(filtroArtistas)}
            >
              {#each artistas.filter(artista => artista.toLowerCase().includes(filtroArtistas.toLowerCase()) && !artistasSeleccionados.includes(artista)) as artista}
                <option value={artista}>{artista}</option>
              {/each}
            </select>
          {/if}
        </div>
  
        <!-- Eventos seleccionados -->
        <div class="campo">
          <label>Eventos seleccionados:</label>
          <ul>
            {#each eventosSeleccionados as evento}
              <li>
                {evento} 
                <button type="button" class="btn-cruz" on:click={() => eliminarEvento(evento)}>✖</button>
              </li>
            {/each}
          </ul>
        </div>
  
        <!-- Buscar y agregar eventos -->
        <div class="campo">
          <label for="eventosSeleccionados">Buscar Evento</label>
          <div class="buscador">
            <input
              type="text"
              placeholder="Buscar evento..."
              bind:value={filtroEventos}
              on:focus={() => (mostrarEventos = true)}
            />
            <button type="button" class="btn-toggle" on:click={() => (mostrarEventos = !mostrarEventos)}>
              {mostrarEventos ? '▲' : '▼'}
            </button>
          </div>
          {#if mostrarEventos}
            <select
              id="eventosSeleccionados"
              bind:value={filtroEventos}
              size="5"
              on:change={() => seleccionarEvento(filtroEventos)}
            >
              {#each eventos.filter(evento => evento.toLowerCase().includes(filtroEventos.toLowerCase()) && !eventosSeleccionados.includes(evento)) as evento}
                <option value={evento}>{evento}</option>
              {/each}
            </select>
          {/if}
        </div>
  
        <div class="campo">
          <label for="imagenes">Imágenes de la escultura</label>
          <input type="file" id="imagenes" multiple on:change={handleFileChange} />
        </div>
  
        <button type="submit">Registrar Escultura</button>
      </form>
    </section>
  {/if}
  
  <style>
    section {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .formulario {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  
    .campo {
      display: flex;
      flex-direction: column;
    }
  
    label {
      font-weight: bold;
      margin-bottom: 5px;
    }
  
    input, select, textarea, button {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    button {
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    .btn-cruz {
      margin-left: 10px;
      background-color: transparent;
      border: none;
      color: red;
      font-size: 18px;
      cursor: pointer;
    }
  
    .btn-cruz:hover {
      color: darkred;
    }
  
    .buscador {
      display: flex;
      align-items: center;
    }
  
    .btn-toggle {
      margin-left: 5px;
      background-color: transparent;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
  
    .btn-toggle:hover {
      color: #007BFF;
    }
  </style>
  