require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

// connect to database
connectDB();

const customerRoutes = require('./server/routes/customer');

// parse data from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files from Public folder
app.use(express.static('public'));

// templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', customerRoutes);

// handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`🆗🆗🆗 App is listening on port ${PORT}`);
});
