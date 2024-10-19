import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener el equivalente a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar dotenv con la ruta correcta
dotenv.config({ path: join(__dirname, '../.env') });

// Verificar si las variables se cargan correctamente
console.log(process.env.DB_USER);
