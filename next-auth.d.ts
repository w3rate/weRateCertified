import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | null;
      provider?: string | null;
      solanaPublicKey?: string | null; 
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id?: string;
    provider?: string;
    solanaPublicKey?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId?: string;
    provider?: string;
    solanaPublicKey?: string;
  }
}