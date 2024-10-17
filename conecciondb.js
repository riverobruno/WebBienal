import { Esculturas } from './clases.js';
import { Visitantes } from './clases.js';
import { Eventos } from './clases.js';
import { Artistas } from './clases.js';
import { Imagenes } from './clases.js';
import mysql from 'mysql2';

function crearConeccion(){
  return mysql.createConnection({
    host: "mysql-78aa191-desarrollosw.b.aivencloud.com",
    port: 27673,
    user: "avnadmin",
    password: "???",
    database: "desarrollo", // Asegúrate de especificar el nombre de tu base de datos
  });
}
function ArtistasConsultas(filtro, orden, cantidad) {
  let con = crearConeccion();
  let listArtistas = [];
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
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
      listArtistas = [];
      if (err) {
        console.error('Error selecting data: ' + err.message);
        return;
      }
      results.forEach((row) => {
        const artista = new Artistas(row.DNI, row.NyA, row.res_biografia, row.contacto, row.URL_foto);
        listArtistas.push(artista);
      });
      // Cerrar la conexión
      con.end();

      return listArtistas;
    });
  });
}

function EsculturasConsulta(filtro, orden, cantidad) {
  let con = crearConeccion();
  let listEsculturas = [];
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");
    // Seleccionar datos de la tabla "esculturas"
    let selectQuery;
    if (cantidad == null) {
      if (filtro == 'promedio') {
        selectQuery = `
        select e.nombre, e.f_creacion, e.antecedentes, e.tecnica, AVG(v.cant_estrellas) as promedio
        from esculturas e inner join votan v on e.nombre = v.nombre_escultura
        group by e.nombre
        order by AVG(v.cant_estrellas) ${orden}`
      }else{
        selectQuery = `
        select e.nombre, e.f_creacion, e.antecedentes, e.tecnica, AVG(v.cant_estrellas) as promedio
        from esculturas e inner join votan v on e.nombre = v.nombre_escultura
        group by e.nombre
        order by ${filtro} ${orden}`;
      }
    } else {
      if (filtro == 'promedio') {
        selectQuery = `
        select e.nombre, e.f_creacion, e.antecedentes, e.tecnica, AVG(v.cant_estrellas) as promedio
        from esculturas e inner join votan v on e.nombre = v.nombre_escultura
        group by e.nombre
        order by AVG(v.cant_estrellas) ${orden}
        LIMIT ${cantidad}`
      } else {
        selectQuery = `
        select e.nombre, e.f_creacion, e.antecedentes, e.tecnica, AVG(v.cant_estrellas) as promedio
        from esculturas e inner join votan v on e.nombre = v.nombre_escultura
        group by e.nombre
        order by ${filtro} ${orden}
        LIMIT ${cantidad}`;
      }
    }

    con.query(selectQuery, function (err, results) {
      if (err) {
        console.error('Error selecting data: ' + err.message);
        return;
      }
      results.forEach((row) => {
        const escultura = new Esculturas([], row.nombre, row.f_creacion, row.antecedente, row.tecnica);
        listEsculturas.push(escultura);
      });
      con.end();

      return listEsculturas;
    });
  });
}

function PromedioEscultura(nombre){
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

function ArtistasdeEscultura(nombre){
  let con = crearConeccion();
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");

    let selectQuery = `SELECT *
    FROM esculturas e inner join hechas_por h on e.nombre = h.nombre_escultura
          natural join artistas a
    WHERE e.nombre = '${nombre}'`;
    
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

function login(correo, password) {
  let con = crearConeccion();
  con.connect(function (err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Connected!");

    let selectQuery = `SELECT count(v.email)
                      FROM visitantes v
                      where v.email = '${correo}' and v.contraseña = '${password}'
                      group by v.email`;

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

//login('acrawford@example.org', '}CH47H3R')

//Ordenar artistas por:

ArtistasConsultas('NyA','DESC',10); //Nombre del artista ▼
ArtistasConsultas('NyA','ASC',10); //Nombre del artista ▲

//Ordenar esculturas por:
/*
EsculturasConsulta('promedio','DESC',10); //Promedio de estrellas ▼
EsculturasConsulta('promedio','ASC', 10); //Promedio de estrellas ▲
EsculturasConsulta('nombre','DESC', 10); //Nombre de escultura ▼
EsculturasConsulta('nombre','ASC', 10); //Nombre de escultura ▲
EsculturasConsulta('f_creacion','DESC', 10); //Fecha de creación ▼
EsculturasConsulta('f_creacion', 'ASC', 10); //Fecha de creación ▲
*/
PromedioEscultura('Vanguardista Legado');
//ArtistasdeEscultura('Vanguardista Legado');

//Ejemplo de tratamiento:
/*
results.forEach((row) => {
  console.log(row.NyA);
});
*/