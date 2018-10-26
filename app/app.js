const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'boilerplate-node-js-web-api', cookie: { maxAge: 60000 }, 
resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

// Connect db Orm (Mongoose)
require('./config/db');

// Models
require('./models/Users');
require('./models/Song');

// Config Passport for authentication
require('./config/passport');

// Set roues
app.use(require('./routes'));

// Error handlers & middlewares
if(!isProduction) {
  app.use((req, res, err) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));