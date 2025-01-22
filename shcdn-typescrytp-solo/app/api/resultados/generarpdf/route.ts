import puppeteer from 'puppeteer';

export async function GET(req) {
  try {
    // Lanza un navegador sin interfaz gráfica
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Define el contenido HTML que se convertirá en PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          p { margin: 5px 0; }
          .footer { margin-top: 50px; font-size: 12px; color: #555; text-align: center; }
        </style>
      </head>
      <body>
        <h1>Factura de Ejemplo</h1>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Descripción:</strong> Esta es una factura generada como ejemplo.</p>
        <div class="footer">
          <p>Gracias por su compra</p>
        </div>
      </body>
      </html>
    `;

    // Carga el HTML en la página
    await page.setContent(htmlContent, { waitUntil: 'load' });

    // Genera el PDF con opciones configuradas
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Incluye colores de fondo
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm',
      },
    });

    // Cierra el navegador
    await browser.close();

    // Devuelve el archivo PDF al cliente
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="factura.pdf"',
      },
    });
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    return new Response('Error al generar el PDF', { status: 500 });
  }
}