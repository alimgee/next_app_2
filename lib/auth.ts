import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the default session and JWT types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
  
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // For now, using environment variables for admin auth
        console.log('Auth attempt - Detailed comparison:', {
          providedUsername: credentials?.username,
          expectedUsername: process.env.ADMIN_USERNAME,
          usernameMatch: credentials?.username === process.env.ADMIN_USERNAME,
          hasProvidedPassword: !!credentials?.password,
          hasExpectedPassword: !!process.env.ADMIN_PASSWORD,
          passwordMatch: credentials?.password === process.env.ADMIN_PASSWORD,
          nodeEnv: process.env.NODE_ENV
        });
        
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          console.log('Authentication successful');
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
          };
        }
        console.log('Authentication failed');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
