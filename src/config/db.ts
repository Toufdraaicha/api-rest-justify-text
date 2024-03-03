import mysql from 'mysql';
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Créer la connexion à la base de données en utilisant les variables d'environnement


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db'
});
export default db;
