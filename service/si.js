import express from 'express';
import cors from 'cors';
import { ArtistasConsultas} from './conecciondb.js';

const app = express();
const port = 3002;

app.use(cors()); // Permitir CORS

// Crear una función asincrónica para manejar las consultas a la base de datos
const obtenerArtistas = async () => {
  try {
    const artistas = await ArtistasConsultas('NyA', 'ASC', 50);

    // Asegúrate de que esculturas es un array
    if (!Array.isArray(artistas)) {
      throw new Error('La consulta no devolvió un array');
    }

    const cards = [];

    for (const [index, artista] of artistas.entries()) {
      // Accede a los métodos de la clase Esculturas
      const nombre = artista.getNyA();
      const imagen = artista.getURL_foto();
      const biografia = artista.getRes_biografia();
      const contacto = artista.getContacto();

      cards.push({
        id: index + 1,
        escultorPantalla: 'Escultor ' + (index + 1),
        content: biografia,
        escultorName: nombre,
        escultorPais: 'src/public/arg.png',  // Aquí podrías agregar lógica para diferentes países
        escultorFoto: imagen,
        contactoEmail: contacto
      });
    }

    return cards;

  } catch (error) {
    console.error('Error al obtener esculturas:', error);
    return [];  // Retornar un array vacío en caso de error
  }
};

// Endpoint para obtener escultores
app.get('/api/escultores', async (req, res) => {
  const cards = await obtenerArtistas();  // Esperamos a que se procesen todas las consultas
  res.json(cards);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
