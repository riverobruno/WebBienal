<script>
    // Datos de ejemplo para los eventos
    let eventos = [
      { id: 1, nombre: "Exposición de Arte Moderno", lugar: "Museo Nacional", tematica: "Arte Contemporáneo" },
      { id: 2, nombre: "Esculturas Antiguas", lugar: "Galería Central", tematica: "Historia" },
      { id: 3, nombre: "Festival de Escultura", lugar: "Parque Cultural", tematica: "Arte Público" },
    ];
  
    const editarEvento = (id) => {
      console.log(`Editar evento con ID: ${id}`);
      // Lógica para editar
    };
  
    const eliminarEvento = (id) => {
      console.log(`Eliminar evento con ID: ${id}`);
      // Lógica para eliminar
    };
  
    function redirigir(ruta) {
      window.location.href = ruta; // Redirige a la ruta especificada
    }
  
    const confirmar = () => {
      console.log('Acción confirmada');
      // Lógica para confirmar
    };
  
    const volver = () => {
      window.location.href = '/admin';
    };
  </script>
  
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
  
    .header {
      text-align: center;
      margin: 20px auto;
    }
  
    h1 {
      margin: 0;
      font-size: 24px;
      color: #333;
      font-weight: bold;
    }
  
    .container {
      display: flex;
      align-items: flex-start;
    }
  
    .botones-izquierda {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 20px;
      margin-top: 20px;
      gap: 10px;
    }
  
    .btn-azul {
      background-color: #3498db;
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  
    .btn-verde {
      background-color: #27ae60;
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  
    .btn-rojo {
      background-color: #e74c3c;
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  
    .btn-azul:hover {
      background-color: #2980b9;
    }
  
    .btn-verde:hover {
      background-color: #2ecc71;
    }
  
    .btn-rojo:hover {
      background-color: #c0392b;
    }
  
    table {
      width: 70%;
      margin: 0 auto;
      border-collapse: collapse;
      background: white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }
  
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
    th {
      background-color: #4CAF50;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }
  
    td {
      color: #333;
    }
  
    tr:hover {
      background-color: #f1f1f1;
    }
  
    .acciones {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  
    .btn-editar {
      background-color: #fbc531;
      border: none;
      cursor: pointer;
      padding: 5px 12px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  
    .btn-eliminar {
      background-color: #e84118;
      border: none;
      cursor: pointer;
      padding: 5px 12px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  
    .btn-editar:hover {
      background-color: #f5c327;
    }
  
    .btn-eliminar:hover {
      background-color: #d63031;
    }
  </style>
  
  <div class="header">
    <h1>Lista de Eventos</h1>
  </div>
  
  <div class="container">
    <div class="botones-izquierda">
      <button class="btn-azul" on:click={() => redirigir('/admin/eventos/alta_evento')}>Agregar Evento</button>
      <button class="btn-verde" on:click={confirmar}>Confirmar</button>
      <button class="btn-rojo" on:click={volver}>Volver</button>
    </div>
  
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Lugar</th>
          <th>Temática</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each eventos as { id, nombre, lugar, tematica }}
          <tr>
            <td>{nombre}</td>
            <td>{lugar}</td>
            <td>{tematica}</td>
            <td class="acciones">
                <button class="btn-editar" on:click={() => redirigir('/admin/eventos/mod_eventos')}>✏️</button>
              <button class="btn-eliminar" on:click={() => eliminarEvento(id)}>❌</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  