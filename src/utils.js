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
