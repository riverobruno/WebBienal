// backend/server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;  // Puerto donde correrá el backend

// Permitir solicitudes CORS desde el frontend (en un entorno de desarrollo)
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud (JSON)
app.use(bodyParser.json());

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: 'mysql-78aa191-desarrollosw.b.aivencloud.com',
  port: 27673,
  user: 'avnadmin',
  password: '???',
  database: 'desarrollo',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Ruta de login
app.post('/api/login', (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Por favor ingrese correo y contraseña' });
  }

  const query = `SELECT * FROM visitantes WHERE email = ? AND contraseña = ?`;

  db.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
