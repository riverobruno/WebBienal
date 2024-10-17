import { Esculturas } from './clases.js';
import { Visitantes } from './clases.js';
import { Eventos } from './clases.js';
import { Artistas } from './clases.js';
import { Imagenes } from './clases.js';
import mysql from 'mysql2';

export function crearConeccion(){
  return mysql.createConnection({
    host: "mysql-78aa191-desarrollosw.b.aivencloud.com",
    port: 27673,
    user: "avnadmin",
    password: "???",
    database: "desarrollo", // Asegúrate de especificar el nombre de tu base de datos
  });
}
export async function ArtistasConsultas(filtro, orden, cantidad) {
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
        selectQuery = `SELECT * FROM artistas ORDER BY ${filtro} ${orden}`;
      } else {
        selectQuery = `SELECT * FROM artistas ORDER BY ${filtro} ${orden} LIMIT ${cantidad}`;
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


export async function EsculturasConsulta(filtro, orden, cantidad) {
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
                group by e.nombre
              ) as tablaPromedios
          ORDER BY ${filtro} ${orden};`;
      } else {
        selectQuery = `
          SELECT *
          FROM esculturas e inner join hechas_por h on e.nombre = h.nombre_escultura
              natural join artistas a inner join imagenes i on e.nombre = i.nombre_escultura
              natural join (
                SELECT e.nombre, AVG(v.cant_estrellas) as promedio
                FROM esculturas e inner join votan v on e.nombre = v.nombre_escultura
                group by e.nombre
              ) as tablaPromedios
          ORDER BY ${filtro} ${orden}
          LIMIT ${cantidad}`;
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
            const nuevoArtista = {
              DNI: row.DNI,
              nombre: row.NyA,
              biografia: row.res_biografia,
              contacto: row.contacto,
              foto: row.URL_foto
            };
            escultura.addArtista(nuevoArtista);
          }

          // Verificar y agregar imagen
          if (!escultura.getImagenes().some(imagen => imagen.URL === row.URL)) {
            const nuevaImagen = {
              URL: row.URL,
              etapa: row.etapa
            };
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

export function PromedioEscultura(nombre){
  let con = crearConeccion();
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");
    let selectQuery = `SELECT AVG(v.cant_estrellas) as promedio 
    FROM esculturas e inner join votan v on e.nombre = v.nombre_escultura
    WHERE nombre_escultura = '${nombre}'
    GROUP BY e.nombre`;
    
    con.query(selectQuery, function (err, results) {
      if (err) {
        console.error('Error selecting data: ' + err.message);
        return;
      }
      con.end();
      return (results[0].promedio);
    });
});
}

export async function ArtistasdeEscultura(nombre) {
  return new Promise((resolve, reject) => {
    let con = crearConeccion();

    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return reject(err); // Rechaza la promesa en caso de error de conexión
      }
      console.log("Connected!");

      let selectQuery = `
        SELECT *
        FROM esculturas e 
        INNER JOIN hechas_por h ON e.nombre = h.nombre_escultura
        NATURAL JOIN artistas a
        WHERE e.nombre = '${nombre}'`;

      con.query(selectQuery, [nombre], function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          return reject(err); // Rechaza la promesa en caso de error en la consulta
        }

        const listArtistas = results.map((row) => {
          return new Artistas(row.DNI, row.NyA, row.res_biografia, row.contacto, row.URL_foto);
        });

        con.end(); // Cierra la conexión
        resolve(listArtistas); // Resuelve la promesa con los resultados
      });
    });
  });
}


export function login(correo, password) {
  let con = crearConeccion();
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");

    let selectQuery = `SELECT *
                      FROM visitantes v
                      where v.email = '${correo}' and v.contraseña = '${password}'`;

    con.query(selectQuery, function (err, results) {
      if (err) {
        console.error('Error selecting data: ' + err.message);
        return;
      }
      con.end();
      return results;
    });
});
}

export async function ImagenesEscultura(escultura) {
  return new Promise((resolve, reject) => {
    let con = crearConeccion();

    con.connect(function (err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return reject(err); // Rechaza la promesa en caso de error de conexión
      }
      console.log("Connected!");

      let selectQuery = `
        SELECT *
        FROM imagenes i 
        INNER JOIN esculturas e ON i.nombre_escultura = e.nombre
        WHERE e.nombre = '${escultura}'`;

      con.query(selectQuery, [escultura], function (err, results) {
        if (err) {
          console.error('Error selecting data: ' + err.message);
          return reject(err); // Rechaza la promesa en caso de error en la consulta
        }

        const listImagenes = results.map((row) => {
          return new Imagenes(row.URL, row.etapa);
        });

        con.end(); // Cierra la conexión
        resolve(listImagenes); // Resuelve la promesa con los resultados
      });
    });
  });
}


//login('acrawford@example.org', '}CH47H3R')

//Ordenar artistas por:
/*
ArtistasConsultas('NyA','DESC',10); //Nombre del artista ▼
ArtistasConsultas('NyA','ASC',10); //Nombre del artista ▲
*/
//Ordenar esculturas por:

//console.log(EsculturasConsulta('promedio','DESC',10)); //Promedio de estrellas ▼

/*
const artistas = await ArtistasConsultas('NyA', 'DESC', 10);
console.log(artistas);

for (const [index, artista] of artistas.entries()) {
  // Accede a los métodos de la clase Esculturas
  const nombre = artista.getNyA();
  console.log(nombre);
  const imagen = artista.getURL_foto();
  console.log(imagen);
  const biografia = artista.getRes_biografia();
  console.log(biografia);
  const contacto = artista.getContacto();
  console.log(contacto);
*/
/*
const esculturas = await EsculturasConsulta('promedio', 'ASC', 10);
console.log(esculturas[0]);
*/

/*
//Promedio de estrellas ▲
EsculturasConsulta('promedio', 'ASC', 10);
EsculturasConsulta('nombre','DESC', 10); //Nombre de escultura ▼
EsculturasConsulta('nombre','ASC', 10); //Nombre de escultura ▲
EsculturasConsulta('f_creacion','DESC', 10); //Fecha de creación ▼
EsculturasConsulta('f_creacion', 'ASC', 10); //Fecha de creación ▲
*/
//PromedioEscultura('Vanguardista Legado');
//ArtistasdeEscultura('Vanguardista Legado');
//ImagenesEscultura('Vanguardista Legado')

//Ejemplo de tratamiento:
/*
results.forEach((row) => {
  console.log(row.NyA);
});
*/