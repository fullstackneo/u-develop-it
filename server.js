const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello');
});

app.use((req, res) => {
  res.status(404).end();
//   res.status(404);
  //   res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at 127.0.0.1:${PORT}`);
});
