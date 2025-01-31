export interface Product {
    id: string;
    name: string;
  }
  
  export interface Client {
    id: string;
    name: string;
    phone: string;
  }
  
  export interface SaleFormData {
    clientId: string;
    paymentMethod: string;
    products: { productId: string; quantity: string }[];
  }
  
  export const fetchProductsAndClients = async () => {
    try {
      const [productResponse, clientResponse] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/clients"),
      ]);
      return {
        products: await productResponse.json(),
        clients: await clientResponse.json(),
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { products: [], clients: [] };
    }
  };
  
  export const submitSale = async (formData: SaleFormData) => {
    try {
      const saleData = {
        clientId: parseInt(formData.clientId, 10),
        paymentMethod: formData.paymentMethod,
        products: formData.products.map((product) => ({
          productId: parseInt(product.productId, 10),
          quantity: parseInt(product.quantity, 10),
        })),
      };
  
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });
  
      if (!response.ok) throw new Error("Failed to create sale");
  
      return { success: true };
    } catch (error) {
      console.error("Error creating sale:", error);
      return { success: false };
    }
  };
  