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

    // Crear una tabla
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS test_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
   
    con.query(createTableQuery, function(err, result) {
        if (err) {
            console.error('Error creating table: ' + err.message);
            return;
        }
        console.log("Table created or already exists.");

        // Insertar datos
        //const insertQuery = `INSERT INTO test_table (name) VALUES ('BENEEEEEYTO')`;
        con.query(insertQuery, function(err, result) {
            if (err) {
                console.error('Error inserting data: ' + err.message);
                return;
            }
            console.log("Data inserted: " + result.affectedRows);

            // Seleccionar datos
            const selectQuery = `SELECT * FROM test_table`;
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
    });
});
