import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/lib/db';
import bcrypt from 'bcrypt';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("No user found");

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error("Wrong password");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de tener esta variable definida en tu .env
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default NextAuth(authOptions);

// //original
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import db from '@/lib/db'
// import bcrypt from 'bcrypt'

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password", placeholder: "*****" },
//       },
//       async authorize(credentials, req) {
//         console.log(credentials)

//         const userFound = await db.user.findUnique({
//             where: {
//                 email: credentials.email
//             }
//         })

//         if (!userFound) throw new Error('No user found')

//         console.log(userFound)

//         const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

//         if (!matchPassword) throw new Error('Wrong password')

//         return {
//             id: userFound.id,
//             name: userFound.username,
//             email: userFound.email,
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   }
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
