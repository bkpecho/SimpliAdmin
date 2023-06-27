require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000 || process.env.PORT;

// parse data from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files from Public folder
app.use(express.static('public'));

// templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// home route
app.get('/', (req, res) => {
  const locals = {
    title: 'NodeJS',
    description: 'Free NodeJS User Management System'
  };

  res.render('index', { locals });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} 🎉🎉🎉`);
});
