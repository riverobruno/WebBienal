var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "mysql-78aa191-desarrollosw.b.aivencloud.com",
    port: 27673,
    user: "avnadmin",
    //password: "XDXD",
    database: "desarrollo" // Asegúrate de especificar el nombre de tu base de datos
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log("Connected!");

    // Seleccionar datos de la tabla "artistas"
    const selectQuery = `SELECT * FROM artistas`;
    con.query(selectQuery, function(err, results) {
        if (err) {
            console.error('Error selecting data: ' + err.message);
            return;
        }
        console.log("Data selected:", results);

        // Cerrar la conexión
        con.end();
    });
});
