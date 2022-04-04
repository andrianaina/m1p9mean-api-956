require('./models/dbConfig');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userController');
const platRestaurantroutes = require('./routes/platRestaurantcontroller');
const commandeRoutes = require('./routes/commandeController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/plat', platRestaurantroutes);
app.use('/commande', commandeRoutes);

app.listen(5500, () => console.log('server started:5500'));