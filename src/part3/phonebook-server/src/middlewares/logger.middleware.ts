const morgan = require('morgan');

export const loggerMiddleware = morgan(function (tokens, req, res) {
  const body = tokens.body(req, res);

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    body ? body : '',
  ].join(' ');
});
