<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let userRole;
    let accesoPermitido = false;
    let mostrandoCarga = false;
    let mensaje = '';
  
    let id = ''; // ID del escultor a modificar
    let nombre = '';
    let apellido = '';
    let dni = '';
    let biografia = '';
    let email = '';
    let contraseña = '';
    let imagenPerfil = null;
  
    onMount(() => {
      userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
        accesoPermitido = true;
        obtenerDatosEscultor(); // Cargar datos del escultor al montar la página
      } else {
        alert('Acceso denegado. Redirigiendo a la página principal.');
        window.location.href = '/inicio';
      }
    });
  
    // Función para obtener los datos del escultor a modificar
    async function obtenerDatosEscultor() {
      mostrandoCarga = true;
      try {
        const res = await axios.get(`http://localhost:3001/api/artista/${id}`);
        const data = res.data;
        nombre = data.nombre;
        apellido = data.apellido;
        dni = data.dni;
        biografia = data.biografia;
        email = data.email;
      } catch (error) {
        console.error('Error al obtener los datos del escultor:', error);
        mensaje = 'No se pudo cargar la información del escultor.';
      } finally {
        mostrandoCarga = false;
      }
    }
  
    // Función para manejar el cambio de archivo
    function handleFileChange(event) {
      imagenPerfil = event.target.files[0];
    }
  
    // Función para enviar el formulario de actualización al backend
    async function enviarFormulario() {
      mostrandoCarga = true;
      try {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('dni', dni);
        formData.append('biografia', biografia);
        formData.append('email', email);
        if (contraseña) formData.append('contrasena', contraseña);
        if (imagenPerfil) formData.append('imagenPerfil', imagenPerfil);
  
        const res = await axios.put(`http://localhost:3001/api/artista/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        mensaje = res.data.mensaje || 'Escultor modificado con éxito';
      } catch (error) {
        console.error('Error al modificar el escultor:', error);
        mensaje = 'Error al modificar el escultor. Por favor, intenta de nuevo.';
      } finally {
        mostrandoCarga = false;
      }
    }
  </script>
  
  {#if accesoPermitido}
    {#if mostrandoCarga}
      <div class="loading-icon"></div>
    {/if}
  
    <button class="btn-volver" on:click={() => (window.location.href = '/admin/artistas')}>Volver</button>
    <section>
      <h1>Modificar Escultor</h1>
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
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" bind:value={email} required />
        </div>
  
        <div class="campo">
          <label for="contraseña">Nueva Contraseña (opcional)</label>
          <input type="password" id="contraseña" bind:value={contraseña} />
        </div>
  
        <div class="campo">
          <label for="imagenPerfil">Actualizar Imagen de Perfil</label>
          <input type="file" id="imagenPerfil" accept="image/*" on:change={handleFileChange} />
        </div>
  
        <button type="submit">Modificar Escultor</button>
      </form>
  
      {#if mensaje}
        <p class="mensaje">{mensaje}</p>
      {/if}
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
  
    .mensaje {
      text-align: center;
      font-size: 16px;
      color: green;
    }
  
    .loading-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    .btn-volver {
      background-color: #dc3545;
      color: white;
      padding: 10px 15px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
  
    .btn-volver:hover {
      background-color: #b02a37;
    }
  </style>
  