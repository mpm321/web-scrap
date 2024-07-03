const express = require('express');
const bodyParser = require('body-parser');
const scraperRoutes = require('./routes/scraperRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', scraperRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
