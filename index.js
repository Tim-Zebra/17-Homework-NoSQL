const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Sets up ports and app variable
const PORT = process.env.PORT || 3001;
const app = express();

// Generates server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Opens database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}/ !`);
  });
});
