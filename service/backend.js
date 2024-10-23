import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ArtistasConsulta, EsculturasConsulta, EventosConsulta, login} from './conecciondb.js';

const app = express();
const port = 3001;

app.use(cors()); // Permitir CORS
// Middleware para analizar el cuerpo de la solicitud (JSON)
app.use(bodyParser.json());
app.use(cookieParser());

// Crear una función asincrónica para manejar las consultas a la base de datos
const obtenerArtistas = async (busqueda) => {
  try {
    const artistas = await ArtistasConsulta('NyA', 'ASC', busqueda, 20);
    if (!Array.isArray(artistas)) {
      throw new Error('La consulta no devolvió un array');
    }

    const cards = [];
    for (const [index, artista] of artistas.entries()) {
      const nombre = artista.getNyA();
      const imagen = artista.getURL_foto();
      const biografia = artista.getRes_biografia();
      const contacto = artista.getContacto();

      cards.push({
        id: index + 1,
        escultorPantalla: nombre.replace(/ /g, ''), 
        content: biografia,
        escultorName: nombre,
        escultorFoto: imagen,
        contactoEmail: contacto
      });
    }

    return cards;

  } catch (error) {
    console.error('Error al obtener artistas:', error);
    return [];
  }
};

const obtenerEsculturas = async (busqueda) => {
  try {
    const esculturas = await EsculturasConsulta('promedio', 'DESC', busqueda, 20);
    // Asegúrate de que esculturas es un array
    if (!Array.isArray(esculturas)) {
      throw new Error('La consulta no devolvió un array');
    }
    const cards = [];
    for (const [index, escultura] of esculturas.entries()) {
      // Accede a los métodos de la clase Esculturas
      const listaObraImagenes = escultura.getImagenes();
      const obraImagen = listaObraImagenes[0].getURL();
      const tecnica = escultura.getTecnica();
      const obraNombre = escultura.getNombre();
      const obraArtistas = escultura.getArtistas();
      const obraArtista = obraArtistas[0].getNyA();
      const obraEscultorFoto = obraArtistas[0].getURL_foto();
      const average = escultura.getPromedio();

      cards.push({
        id: index + 1,
        title: 'Carta' + (index + 1),
        obraPantalla: obraNombre.replace(/ /g, ''),
        obraImage: obraImagen,
        content: tecnica,
        obraName: obraNombre,
        obraEscultor: obraArtista,
        obraEscultorFoto: obraEscultorFoto,
        promedio: average
      });
    }

    return cards;

  } catch (error) {
    console.error('Error al obtener esculturas:', error);
    return [];  // Retornar un array vacío en caso de error
  }
};

const obtenerEventos = async (busqueda) => {
  try {
    const eventos = await EventosConsulta('nombre', 'DESC', busqueda, 20);

    // Asegúrate de que esculturas es un array
    if (!Array.isArray(eventos)) {
      throw new Error('La consulta no devolvió un array');
    }

    const cards = [];

    for (const [index, evento] of eventos.entries()) {
      // Accede a los métodos de la clase Eventos
      const titulo = evento.getNombre();
      const fechaInicio = new Date(evento.getFechaInicio());
      const fechaFin = new Date(evento.getFechaFin());
      const tematica = evento.getTematica();
      const lugar = evento.getLugar();
      const horaInicio = evento.getHoraInicio();
      const horaFin = evento.getHoraFin();
      const options = {month: 'long', day: 'numeric' };
      const formattedFechaInicio = fechaInicio.toLocaleDateString('es-ES', options);
      const formattedFechaFin = fechaFin.toLocaleDateString('es-ES', options);

      const formattedHoraInicio = horaInicio.split(':').slice(0, 2).join(':');  // De "09:30:00" a "09:30"
      const formattedHoraFin = horaFin.split(':').slice(0, 2).join(':');        // De "15:00:00" a "15:00"


      cards.push({
        title: 'evento' + (index + 1),
        eventName: titulo,
        eventoPantalla: titulo.replace(/ /g, ''),
        eventStartDate: formattedFechaInicio,
        eventFinishDate: formattedFechaFin,
        startTime: formattedHoraInicio,
        finishTime: formattedHoraFin,
        location: lugar,
        content: tematica
      });
    }

    return cards;

  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return [];  // Retornar un array vacío en caso de error
  }
};

// Endpoint para obtener escultores
app.get('/api/escultores', async (req, res) => {
  const searchQuery = req.query.search;
  const cards = await obtenerArtistas(searchQuery);  // Esperamos a que se procesen todas las consultas
  res.json(cards);
});

// Endpoint para obtener esculturas
app.get('/api/esculturas', async (req, res) => {
  const searchQuery = req.query.search;
  const cards = await obtenerEsculturas(searchQuery);  // Esperamos a que se procesen todas las consultas
  res.json(cards);
});

app.get('/api/eventos', async (req, res) => {
  const searchQuery = req.query.search;
  const cards = await obtenerEventos(searchQuery);  // Esperamos a que se procesen todas las consultas
  res.json(cards);
});

app.post('/api/login', (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar si se ingresaron correo y contraseña
  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Por favor ingrese correo y contraseña' });
  }

  login(correo, contraseña)
    .then(coneccion => {
      // Aquí es donde manejamos los resultados
      if (coneccion && coneccion.length > 0) {
        // Establecer la cookie antes de enviar la respuesta
        res.cookie('correo', correo, { httpOnly: true, maxAge: 3600000 }); // Cookie válida por 1 hora
        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    })
    .catch(error => {
      // En caso de error, enviamos una respuesta con estado 500
      console.error('Error en la conexión:', error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
