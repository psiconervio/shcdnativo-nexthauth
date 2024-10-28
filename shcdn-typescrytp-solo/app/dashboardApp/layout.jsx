// src/app/layout.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><a href="/">Dashboard</a></li>
            <li><a href="/ingredients">Ingredientes</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/production">Producción</a></li>
          </ul>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}