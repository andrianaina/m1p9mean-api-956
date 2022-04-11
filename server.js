require('./models/dbConfig');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userController');
const platRestaurantroutes = require('./routes/platRestaurantController');
const commandeRoutes = require('./routes/commandeController');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/user', userRoutes);
app.use('/plat', platRestaurantroutes);
app.use('/commande', commandeRoutes);

app.listen(process.env.PORT || 5000,() => console.log('server started:'));
