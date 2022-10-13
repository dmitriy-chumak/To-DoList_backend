const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./src/modules/routes/routes')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const port = 8080;
const db_url = 'mongodb+srv://sysdba:sysdba123@cluster0.rrv9lh4.mongodb.net/?retryWrites=true&w=majority'

app.use('/', apiRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});
    app.listen(port, () => console.log('Listen port ', port));
  } catch (error) {
    console.log(error);
  }
}

startApp();