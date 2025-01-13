/**
 * Registrar un movimiento de stock (producción, defectos, ventas, ajustes).
 */
export async function POST(request) {
    try {
      const { productId, quantity, type, comment } = await request.json();
  
      if (!productId || !quantity || !type) {
        return NextResponse.json(
          { error: "Se requiere productId, quantity y type." },
          { status: 400 }
        );
      }
  
      // Validar tipo de movimiento
      if (!["PRODUCED", "DEFECTIVE", "SALE", "ADJUSTMENT"].includes(type)) {
        return NextResponse.json(
          { error: "Tipo inválido: PRODUCED, DEFECTIVE, SALE o ADJUSTMENT." },
          { status: 400 }
        );
      }
  
      // Determinar cambio en el stock
      const stockChange =
        type === "DEFECTIVE" || type === "SALE" ? -Math.abs(quantity) : Math.abs(quantity);
  
      // Registrar movimiento en el log
      const logEntry = await prisma.productStockLog.create({
        data: {
          productId,
          quantity: stockChange,
          type,
          comment,
        },
      });
  
      // Actualizar stock asociado
      const stockUpdate = await prisma.productStock.update({
        where: { productId },
        data: {
          stock: { increment: stockChange },
        },
      });
  
      return NextResponse.json(
        { message: "Movimiento registrado y stock actualizado.", logEntry, stockUpdate },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error al registrar el movimiento de stock." },
        { status: 500 }
      );
    }
  }
  /**
 * Consultar el historial de movimientos de stock para un producto.
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
  
    if (!productId) {
      return NextResponse.json(
        { error: "Se requiere el parámetro productId." },
        { status: 400 }
      );
    }
  
    try {
      const logs = await prisma.productStockLog.findMany({
        where: {
          productId: parseInt(productId),
          createdAt: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        orderBy: { createdAt: "desc" },
      });
  
      return NextResponse.json(logs, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error al obtener los movimientos de stock." },
        { status: 500 }
      );
    }
  }
  
  