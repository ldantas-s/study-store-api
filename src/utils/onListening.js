export const onListening = (addr, debug) => () => {
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  debug('listening on', bind);
};
