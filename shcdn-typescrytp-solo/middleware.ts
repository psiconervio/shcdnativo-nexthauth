export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    //Poner RUTAS PROTEGIDAS
    // "/dashboard/:path*",
    "/cursos/:path*",
  ],
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => !!token, // Permite acceso si hay un token
//   },
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/products/:path*"], // Define las rutas protegidas
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET || 'mysecretkey';

// export function middleware(req: NextRequest) {
//   // Define las rutas que deseas proteger
//   const protectedPaths = ['/api/products', '/dashboard'];

//   // Verifica si la ruta solicitada está dentro de las rutas protegidas
//   const isProtectedPath = protectedPaths.some((path) =>
//     req.nextUrl.pathname.startsWith(path)
//   );

//   if (isProtectedPath) {
//     const authHeader = req.headers.get('authorization');
//     const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

//     // Verifica si el token está presente
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
//     }

//     try {
//       // Verifica el token JWT
//       jwt.verify(token, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 403 });
//     }
//   }

//   // Si la ruta no está protegida, permite que continúe
//   return NextResponse.next();
// }

// export const config = {
//   // Indica qué rutas deseas que sean interceptadas por el middleware
//   matcher: ['/api/products/:path*', '/dashboard/:path*'],
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET || 'mysecretkey';

// export function middleware(req: NextRequest) {
//   // Define las rutas que deseas proteger
//   const protectedPaths = ['/api/products', '/api/products/', '/dashboard'];

//   // Verifica si la ruta solicitada está dentro de las rutas protegidas
//   const isProtectedPath = protectedPaths.some((path) =>
//     req.nextUrl.pathname.startsWith(path)
//   );

//   if (isProtectedPath) {
//     const token = req.headers.get('authorization')?.split(' ')[1];

//     // Verifica si el token está presente
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     try {
//       // Verifica el token JWT
//       jwt.verify(token, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
//     }
//   }

//   // Si la ruta no está protegida, permite que continúe
//   return NextResponse.next();
// }

// export const config = {
//   // Indica qué rutas deseas que sean interceptadas por el middleware
//   matcher: ['/api/products/:path*','/dashboard/:path*'],
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function middleware(req: NextRequest) {
//   const protectedPaths = ['/api/products', '/api/products/', '/api/products/[id]'];
//   const authRequired = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

//   if (authRequired) {
//     const token = req.headers.get('authorization')?.split(' ')[1];
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     try {
//       jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
//     } catch (error) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/products/:path*'],
// };
