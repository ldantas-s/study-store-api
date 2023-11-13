import crypto from 'crypto';

export const createEncryptValue = (value) => {
  const hash = crypto.createHmac('sha256', process.env.SALT_KEY);
  return hash.update(value).digest('hex');
};
