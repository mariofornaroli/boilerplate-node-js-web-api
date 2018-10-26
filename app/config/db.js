const mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/boilerplate-node-js-web-api');
mongoose.set('debug', true);

