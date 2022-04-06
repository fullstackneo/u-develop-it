const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).end('213213');
  //   res.statusMessage(400);
  //   res.status(404);
  //   res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at 127.0.0.1:${PORT}`);
});