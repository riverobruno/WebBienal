<script>
    let nombre = '';
    let apellido = '';
    let dni = '';
    let biografia = '';
    let telefono = '';
    let email = '';
    let imagenPerfil = null;
  
    function handleFileChange(event) {
      imagenPerfil = event.target.files[0];
    }
  
    function enviarFormulario() {
      const data = new FormData();
      data.append('nombre', nombre);
      data.append('apellido', apellido);
      data.append('dni', dni);
      data.append('biografia', biografia);
      data.append('telefono', telefono);
      data.append('email', email);
      data.append('imagenPerfil', imagenPerfil);
  
      console.log('Formulario enviado:', data);
      alert('Datos del escultor enviados con éxito.');
    }
  </script>
  
  <section>
    <h1>Registrar Escultor</h1>
    <form on:submit|preventDefault={enviarFormulario} class="formulario">
      <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" bind:value={nombre} required />
      </div>
  
      <div class="campo">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" bind:value={apellido} required />
      </div>
  
      <div class="campo">
        <label for="dni">DNI</label>
        <input type="text" id="dni" bind:value={dni} required />
      </div>
  
      <div class="campo">
        <label for="biografia">Biografía</label>
        <textarea id="biografia" bind:value={biografia} rows="4" required></textarea>
      </div>
  
      <div class="campo">
        <label for="telefono">Número de Teléfono</label>
        <input type="tel" id="telefono" bind:value={telefono} required />
      </div>
  
      <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
  
      <div class="campo">
        <label for="imagenPerfil">Imagen de Perfil</label>
        <input type="file" id="imagenPerfil" accept="image/*" on:change={handleFileChange} required />
      </div>
  
      <button type="submit">Registrar Escultor</button>
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
  
    input, textarea, button {
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
  