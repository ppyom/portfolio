import jwt from 'jsonwebtoken';
import { config } from '@config';
import { messages } from '@constants';

type TokenType = 'access' | 'refresh';

interface Payload {
  id: number;
  email: string;
}

export const generateToken = (
  payload: Payload,
  options?: jwt.SignOptions,
  type: TokenType = 'access',
) => {
  try {
    return jwt.sign(payload, config.jwt.secret[type], options);
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const verifyToken = (token: string, type: TokenType = 'access') => {
  try {
    const result = jwt.verify(token, config.jwt.secret[type]);
    console.log(result);
    return result;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return messages.error.jwt.expired;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return messages.error.jwt.invalid;
    }
    // TODO jsonwebtoken -> jose로 변경 필요!!!! (The edge runtime does not support Node.js 'crypto' module.)
    console.error(error);
    return messages.error.unknown;
  }
};

export const createToken = () => {};
