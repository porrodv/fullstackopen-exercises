const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://phonebook-fullstack-app-express-and-react.onrender.com',
  'https://phonebook-fullstack-app-express-and-react.onrender.com:3001',
];

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
