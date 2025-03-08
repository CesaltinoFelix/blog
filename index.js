const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const CategoriesController = require('./categories/CategoriesController')
const ArticlesController = require('./articles/ArticlesController')

const Category = require('./categories/Category')
const Article = require('./articles/Article')
const app = express();

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

const port = 3000;

// Database connection
connection.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.log('Error connecting to the database: ' + err);
  });

// Routes
app.use("/", CategoriesController)
app.use("/", ArticlesController)
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(port, (err) => {
  if (err) {
    console.log('Error starting the server: ' + err);
    return;
  }
  console.log(`Server running on port: ${port}`);
});
