import bcrypt from 'bcryptjs';

export const getHashedPassword = async (password: string) => await bcrypt.hash(password, 10);
export const comparePasswords = async (passwordA: string, passwordB: string) => await bcrypt.compare(passwordA, passwordB);
