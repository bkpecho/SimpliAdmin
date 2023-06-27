require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { flash } = require('express-flash-message');
const session = require('express-session');
const connectDB = require('./server/config/db');
const customerRoutes = require('./server/routes/customer');

const app = express();
const PORT = 3000 || process.env.PORT;

// connect to database
connectDB();

// parse data from forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// override url with PUT/DELETE
app.use(methodOverride('_method'));

// serve static files from Public folder
app.use(express.static('public'));

// express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  })
);

// flash messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

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
