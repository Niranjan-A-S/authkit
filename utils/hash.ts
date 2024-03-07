import bcrypt from 'bcryptjs';

export const getHashedPassword = async (password: string) => await bcrypt.hash(password, 10);
