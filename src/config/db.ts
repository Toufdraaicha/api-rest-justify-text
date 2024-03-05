import mysql from 'mysql';
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Créer la connexion à la base de données en utilisant les variables d'environnement

console.log(process.env.DB_HOST)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
export default db;
