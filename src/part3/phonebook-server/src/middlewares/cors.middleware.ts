const cors = require('cors');

const allowedOrigins = ['http://localhost:5173'];

// Config Cors
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, HEAD, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

module.exports = cors(corsOptions);
