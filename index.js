const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();
dotenv.config();

app.use(cors());
// app.use(express.json());
app.use('/api/v1/products', routes.products);
app.use('/api/v1/customers', routes.customers);

app.get('/', (_, res) => {
  res.send('API is running......');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

const mongoose = require('mongoose');
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase was connected successfully');
  })
  .catch(error => console.log(error));
