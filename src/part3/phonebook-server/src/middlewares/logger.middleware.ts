const morgan = require('morgan');

const loggerOptions = function (tokens, req, res) {
  const body = req.body;

  const isEmptyBody = body && Object.keys(body).length === 0;

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    !isEmptyBody ? JSON.stringify(body) : '',
  ].join(' ');
};

module.exports = morgan(loggerOptions);
