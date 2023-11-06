import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connectdb";
import { compare } from "bcrypt";
import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const existingUsername = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUsername) {
          return null;
        }

        if (existingUsername.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUsername.password!
          );

          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: `${existingUsername.id}`,
          name: existingUsername.name,
          username: existingUsername.username,
          email: existingUsername.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.id = token.id;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          name: token.name,
          image: token.image,
        },
      };
    },
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
