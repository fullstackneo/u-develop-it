const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'admin123',
    database: 'election',
  },
  console.log('Connected to the election database.')
);

app.get('/', (req, res) => {
  res.json('Hello');
});



// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 5, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [113, 'Ronald2', 'Firbank2', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

db.query(`select * from candidates`, (err, rows) => {
  err && console.log(err.message);
  console.table(rows);
});


app.use((req, res) => {
  res.status(404).end('213213');
  //   res.status(404);
  //   res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at 127.0.0.1:${PORT}`);
});
