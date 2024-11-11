import { Esculturas, Visitantes, Eventos, Artistas, Imagenes } from './clases.js';
import mysql from 'mysql2';
// Esto de abajo es para usar el .env para guardar la contraseña de la database
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });


export function crearConexion(){
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}
export async function ArtistasConsulta() {
  const con = crearConexion();

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err);
        return;
      }

      console.log("Connected!");
      // Seleccionar datos de la tabla "artistas"

      con.query('CALL cons_artistas()', function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err);
          return;
        }
        const resultados = results[0];
        const listArtistas = resultados.map((row) => {
          return new Artistas(row.DNI, row.NyA, row.res_biografia, row.contacto, row.URL_foto, row.promedio);
        });

        // Cerrar la conexión
        con.end();
        resolve(listArtistas);
      });
    });
  });
}

export async function EsculturasConsulta() {
  return new Promise((resolve, reject) => { // Aquí creamos una nueva promesa
    let con = crearConexion();

    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err); // Rechazamos la promesa en caso de error
        return;
      }
      console.log("Connected!");

      con.query('CALL cons_esculturas()', function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err); // Rechazamos la promesa en caso de error
          return;
        }

        const esculturasMap = new Map();

        results[0].forEach((row) => {
          const esculturaNombre = row.nombre;

          // Verificar si la escultura ya está en el map
          if (!esculturasMap.has(esculturaNombre)) {
            // Si no existe, crear una nueva instancia de Esculturas
            const nuevaEscultura = new Esculturas(row.nombre, row.f_creacion, row.antecedentes, row.tecnica, row.promedio);
            esculturasMap.set(esculturaNombre, nuevaEscultura);
          }

          // Obtener la escultura actual del map
          const escultura = esculturasMap.get(esculturaNombre);

          // Verificar y agregar artista
          if (!escultura.getArtistas().some(artista => artista.DNI === row.DNI)) {
            const nuevoArtista = new Artistas(
              row.DNI,
              row.NyA,
              row.res_biografia,
              row.contacto,
              row.URL_foto,
              0
            );
            escultura.addArtista(nuevoArtista);
          }

          // Verificar y agregar imagen
          if (!escultura.getImagenes().some(imagen => imagen.URL === row.URL)) {
            const nuevaImagen = new Imagenes(
              row.URL,
              row.etapa
          );
            escultura.addImagen(nuevaImagen);
          }

        });

        // Convertir el Map a un array de esculturas
        const listEsculturas = Array.from(esculturasMap.values());

        con.end(); // Cierra la conexión
        resolve(listEsculturas); // Resolvemos la promesa con el resultado
      });
    });
  });
};

export async function login(correo, password) {
  let con = crearConexion();

  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err); // Rechazar la promesa en caso de error de conexión
        return;
      }
      console.log("Connected!");

      // Realizamos la consulta a la base de datos pasando los parámetros
      const query = 'CALL login(?, ?)'; // Definimos los placeholders
      con.query(query, [correo, password], (err, results) => { // Pasamos los valores
        if (err) {
          console.error('Error querying the database:', err);
          reject(err); // Rechazar la promesa en caso de error en la consulta
        } else {
          resolve(results[0]); // Resolver la promesa con los resultados
        }
        con.end(); // Cerramos la conexión
      });
    });
  });
}

export async function EventosConsulta() {
  const con = crearConexion();

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err);
        return;
      }

      console.log("Connected!");
      
      // Seleccionar datos de la tabla "eventos"
      con.query('CALL cons_eventos()', function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err);
          return;
        }
        const resultados = results[0];
        const listEventos = resultados.map((row) => {
          return new Eventos(row.nombre, row.lugar, row.fecha_inicio, row.fecha_fin, row.tematica, row.hora_inicio, row.hora_fin, row.promedio);
        });

        // Cerrar la conexión
        con.end();
        resolve(listEventos);
      });
    });
  });
}


// Función para consultar la información del artista y su obra más reciente
export async function obtenerArtistaYObraReciente(email) {
  const con = crearConexion();

  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error('Error al conectar:', err.stack);
        reject(err);
        return;
      }

      const query = `
        SELECT artistaNombre, artistaDNI, temp.res_biografia AS biografia,
               obraNombre, obraFechaCreacion, temp.tecnica, im.URL AS imagen_url
        FROM (
          SELECT a.NyA AS artistaNombre, a.DNI AS artistaDNI, a.res_biografia,
                 o.nombre AS obraNombre, o.f_creacion AS obraFechaCreacion, o.tecnica
          FROM artistas a
          INNER JOIN hechas_por h ON a.DNI = h.DNI
          INNER JOIN esculturas o ON h.nombre_escultura = o.nombre
          WHERE a.contacto = ?
          ORDER BY o.f_creacion DESC
          LIMIT 1
        ) AS temp
        INNER JOIN imagenes im ON obraNombre = im.nombre_escultura
      `;

      con.query(query, [email], (error, results) => {
        con.end();

        if (error) {
          console.error('Error en la consulta:', error.message);
          reject(error);
          return;
        }

        resolve(results[0]); // Retornamos solo el primer resultado
      });
    });
  });
}