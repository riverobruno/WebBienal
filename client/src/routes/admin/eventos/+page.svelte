<script>
    let nombre = '';
    let lugar = '';
    let tematica = '';
    let fechaInicio = '';
    let fechaFin = '';
    let horaInicio = '';
    let horaFin = '';
  
    function enviarFormulario() {
      const data = {
        nombre,
        lugar,
        tematica,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
      };
  
      console.log('Formulario enviado:', data);
      alert('Evento registrado con éxito.');
    }
  </script>
  
  <section>
    <h1>Registrar Evento</h1>
    <form on:submit|preventDefault={enviarFormulario} class="formulario">
      <div class="campo">
        <label for="nombre">Nombre del Evento</label>
        <input type="text" id="nombre" bind:value={nombre} required />
      </div>
  
      <div class="campo">
        <label for="lugar">Lugar</label>
        <input type="text" id="lugar" bind:value={lugar} required />
      </div>
  
      <div class="campo">
        <label for="tematica">Temática</label>
        <input type="text" id="tematica" bind:value={tematica} required />
      </div>
  
      <div class="campo">
        <label for="fechaInicio">Fecha de Inicio</label>
        <input type="date" id="fechaInicio" bind:value={fechaInicio} required />
      </div>
  
      <div class="campo">
        <label for="fechaFin">Fecha de Fin</label>
        <input type="date" id="fechaFin" bind:value={fechaFin} required />
      </div>
  
      <div class="campo">
        <label for="horaInicio">Hora de Inicio</label>
        <input type="time" id="horaInicio" bind:value={horaInicio} required />
      </div>
  
      <div class="campo">
        <label for="horaFin">Hora de Fin</label>
        <input type="time" id="horaFin" bind:value={horaFin} required />
      </div>
  
      <button type="submit">Registrar Evento</button>
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
  
    input, button {
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
  