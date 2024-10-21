import { Esculturas } from './clases.js';
import { Visitantes } from './clases.js';
import { Eventos } from './clases.js';
import { Artistas } from './clases.js';
import { Imagenes } from './clases.js';
import mysql from 'mysql2';
// Esto de abajo es para usar el .env para guardar la contraseña de la database
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });


export function crearConeccion(){
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}
export async function ArtistasConsulta(filtro, orden, busqueda, cantidad) {
  const con = crearConeccion();

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err);
        return;
      }

      console.log("Connected!");
      // Seleccionar datos de la tabla "artistas"
      let selectQuery;
      if (cantidad == null) {
        selectQuery = `SELECT * FROM artistas 
                      where NyA like '%${busqueda}%' or res_biografia like '%${busqueda}%' or contacto like '%${busqueda}%'
                      ORDER BY ${filtro} ${orden}`;
      } else {
        selectQuery = `SELECT * FROM artistas 
                      where NyA like '%${busqueda}%' or res_biografia like '%${busqueda}%' or contacto like '%${busqueda}%'
                      ORDER BY ${filtro} ${orden} 
                      LIMIT ${cantidad}`;
      }

      con.query(selectQuery, function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err);
          return;
        }

        const listArtistas = results.map((row) => {
          return new Artistas(row.DNI, row.NyA, row.res_biografia, row.contacto, row.URL_foto);
        });

        // Cerrar la conexión
        con.end();
        resolve(listArtistas);
      });
    });
  });
}

export async function EsculturasConsulta(filtro, orden, busqueda, cantidad) {
  return new Promise((resolve, reject) => { // Aquí creamos una nueva promesa
    let con = crearConeccion();

    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err); // Rechazamos la promesa en caso de error
        return;
      }
      console.log("Connected!");

      let selectQuery;
      if (cantidad == null) {
        selectQuery = `
          SELECT *
          FROM esculturas e inner join hechas_por h on e.nombre = h.nombre_escultura
              natural join artistas a inner join imagenes i on e.nombre = i.nombre_escultura
              natural join (
                SELECT e.nombre, AVG(v.cant_estrellas) as promedio
                FROM esculturas e inner join votan v on e.nombre = v.nombre_escultura
                WHERE e.nombre like '%${busqueda}%' or e.tecnica like '%${busqueda}%'
                group by e.nombre
                ORDER BY ${filtro} ${orden}
              ) as tablaPromedios
          `;
      } else {
        selectQuery = `
          SELECT *
          FROM esculturas e inner join hechas_por h on e.nombre = h.nombre_escultura
              natural join artistas a inner join imagenes i on e.nombre = i.nombre_escultura
              natural join (
                SELECT e.nombre, AVG(v.cant_estrellas) as promedio
                FROM esculturas e inner join votan v on e.nombre = v.nombre_escultura
                WHERE e.nombre like '%${busqueda}%' or e.tecnica like '%${busqueda}%'
                GROUP BY e.nombre
                ORDER BY ${filtro} ${orden}
                LIMIT ${cantidad}
              ) as tablaPromedios
          `;
        }

      con.query(selectQuery, function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err); // Rechazamos la promesa en caso de error
          return;
        }

        const esculturasMap = new Map();

        results.forEach((row) => {
          const esculturaNombre = row.nombre;

          // Verificar si la escultura ya está en el map
          if (!esculturasMap.has(esculturaNombre)) {
            // Si no existe, crear una nueva instancia de Esculturas
            const nuevaEscultura = new Esculturas(row.nombre, row.f_creacion, row.antecedentes, row.tecnica);
            nuevaEscultura.setPromedio(row.promedio);  // Setear el promedio
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
              row.URL_foto
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
  let con = crearConeccion();

  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err); // Rechazar la promesa en caso de error de conexión
        return;
      }
      console.log("Connected!");

      let selectQuery = `
        SELECT *
        FROM visitantes v
        WHERE v.email = ? AND v.contraseña = ?
      `;

      // Realizamos la consulta a la base de datos
      con.query(selectQuery, [correo, password], (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
          reject(err); // Rechazar la promesa en caso de error en la consulta
        } else {
          resolve(results); // Resolver la promesa con los resultados
        }
        con.end(); // Cerramos la conexión
      });
    });
  });
}

export async function EventosConsulta(filtro, orden, busqueda, cantidad) {
  const con = crearConeccion();

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        reject(err);
        return;
      }

      console.log("Connected!");
      // Seleccionar datos de la tabla "eventos"
      let selectQuery;
      if (cantidad == null) {
        selectQuery = `SELECT * 
                        FROM eventos 
                        where nombre like '%${busqueda}%' or lugar like '%${busqueda}%' or tematica like '%${busqueda}%'
                        ORDER BY ${filtro} ${orden}`;
      } else {
        selectQuery = `SELECT * 
                        FROM eventos 
                        where nombre like '%${busqueda}%' or lugar like '%${busqueda}%' or tematica like '%${busqueda}%'
                        ORDER BY ${filtro} ${orden} 
                        LIMIT ${cantidad}`;
      }

      con.query(selectQuery, function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          reject(err);
          return;
        }

        const listEventos = results.map((row) => {
          return new Eventos(row.nombre, row.lugar, row.fecha_inicio, row.fecha_fin, row.tematica, row.hora_inicio, row.hora_fin);
        });

        // Cerrar la conexión
        con.end();
        resolve(listEventos);
      });
    });
  });
}