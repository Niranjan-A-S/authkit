import { auth } from '@/auth';

export const getCurrentUser = () => auth().then(session => session?.user).catch(() => null);
