function productInfoError(product) {
    return `Error when creating the product. Expected arguments:
      title: string;
      description: string;
      code: string;
      price: number;
      stock: number;
      category: string;
      status: boolean (optional);
      thumbnail: string[] (optional);
      Recieved:
      ${JSON.stringify(product)}
    `;
  }
  
  export default productInfoError;