import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

declare module "next-auth" {
   interface Session {
      user: {
         id: string;
      } & DefaultSession["user"];
   }
}

const handler = NextAuth({
   adapter: PrismaAdapter(prisma),
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],

   callbacks: {
      async session({ session, user }) {
         if (session?.user) {
            session.user.id = user.id;
         }
         return session;
      },
   },
});

export { handler as GET, handler as POST };
