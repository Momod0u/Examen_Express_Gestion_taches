const express = require('express');

const app = express();

const path = require('path');

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const tacheRoute = require('./route/tache_route');

app.use('/', tacheRoute);

app.listen(4000, () => {
    console.log('Serveur lance sur http://localhost:4000');
});