require('babel-register');
require('babel-polyfill');

const seedEverything = require('./db/seed').default;

seedEverything();
