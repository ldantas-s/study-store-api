export const normalizePort = (value = 3000) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) return port;
  if (port >= 0) return port;

  return false;
};
