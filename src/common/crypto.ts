import { compare, hash } from 'bcrypt';

const saltRounds = parseInt(process.env.CRYPT_SALT) || 10;

export const hashPassword = (password: string): Promise<string> =>
  hash(password, saltRounds);

export const verifyPassword = (
  password: string,
  passwordHash: string,
): Promise<boolean> => compare(password, passwordHash);
