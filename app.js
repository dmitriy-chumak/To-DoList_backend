const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./src/modules/routes/routes')
const cors = require('cors');
const {URL, PORT} = require('./config');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', apiRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true});
    app.listen(PORT, () => console.log('Listen port ', PORT));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startApp();