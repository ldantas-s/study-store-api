import crypto from 'crypto';

export const randomID = (length) => {
  const head = Date.now().toString(32);
  const tail = Math.random().toString(32).substring(2);

  return (head + tail).substring(0, length);
};

export const createEncryptValue = (value) => {
  const hash = crypto.createHmac('sha256', process.env.SALT_KEY);
  return hash.update(value).digest('hex');
};

export const normalizePort = (value = 3000) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) return port;
  if (port >= 0) return port;

  return false;
};

export const onListening = (addr, debug) => () => {
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debug('listening on', bind);
};
