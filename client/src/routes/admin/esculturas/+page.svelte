<script>
    import { onMount } from 'svelte';
  
    let artistas = [];
    let eventos = [];
    let nombre = '';
    let fechaCreacion = '';
    let tecnica = '';
    let antecedentes = '';
    let artistaSeleccionado = '';
    let eventoSeleccionado = '';
  
    onMount(async () => {
      // Simula la obtención de datos de artistas y eventos desde una API
      artistas = await fetchArtistas();
      eventos = await fetchEventos();
    });
  
    async function fetchArtistas() {
      // Reemplaza con tu llamada a API para obtener los artistas
      return ['Artista 1', 'Artista 2', 'Artista 3'];
    }
  
    async function fetchEventos() {
      // Reemplaza con tu llamada a API para obtener los eventos
      return ['Evento 1', 'Evento 2', 'Evento 3'];
    }
  
    function enviarFormulario() {
      const data = {
        nombre,
        fechaCreacion,
        tecnica,
        antecedentes,
        artistaSeleccionado,
        eventoSeleccionado,
      };
      console.log('Formulario enviado:', data);
      alert('Datos enviados con éxito');
    }
  </script>
  
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
  
      <div class="campo">
        <label for="artistaSeleccionado">Artista</label>
        <select id="artistaSeleccionado" bind:value={artistaSeleccionado} required>
          <option value="" disabled selected>Selecciona un artista</option>
          {#each artistas as artista}
            <option value={artista}>{artista}</option>
          {/each}
        </select>
      </div>
  
      <div class="campo">
        <label for="eventoSeleccionado">Evento</label>
        <select id="eventoSeleccionado" bind:value={eventoSeleccionado} required>
          <option value="" disabled selected>Selecciona un evento</option>
          {#each eventos as evento}
            <option value={evento}>{evento}</option>
          {/each}
        </select>
      </div>
  
      <button type="submit">Registrar Escultura</button>
    </form>
  </section>
  
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
  </style>
  