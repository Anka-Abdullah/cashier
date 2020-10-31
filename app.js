require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const productsRoutes = require('./src/routes/products')
const usersRoutes = require('./src/routes/users')
const historiesRoutes = require('./src/routes/histories')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

app.use('/api/v1/product', productsRoutes)
app.use('/api/v1/user', usersRoutes)
app.use('/api/v1/history', historiesRoutes)

app.use('/uploads', express.static('./uploads'))
const port = process.env.DB_PORT
app.listen(port, () => {
    console.log(`server running`);
});