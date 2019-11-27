// .env configuration
require('dotenv').config()

const express = require('express'),
      app = express(),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      PORT = process.env.PORT || 3000;

// DB Setup
// require('./db/dbSetup')

app.listen(PORT, _ => {
  console.log('Server up and running on port ' + PORT)
})
