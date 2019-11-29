// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      PORT = process.env.PORT || 3000,
      eHandler = require('./middleware/errorHandling'),
      sendAsJSON = require('./middleware/sendAsJson'),
      // Routers
      categoryRoutes = require('./routes/category'),
      authRoutes = require('./routes/auth');

// DB Setup
require('./db/dbSetup')

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// Serves build
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/api', authRoutes);
app.use('/api/users/:userId/categories', categoryRoutes);

// Error handling
app.use(eHandler());
app.use(sendAsJSON());

// Redirects everything else to index
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, _ => {
  console.log('Server up and running on port ' + PORT)
})
