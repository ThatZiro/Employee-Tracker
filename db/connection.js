const mysql = require('mysql2/promise');

async function ConnectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employees_db',
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database: ' + err);
    throw err;
  }
}

module.exports = ConnectToDatabase;