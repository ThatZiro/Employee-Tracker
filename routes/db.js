app.get('/departments', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
      if (err) {
        console.error('Error executing SQL query: ' + err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });
  });