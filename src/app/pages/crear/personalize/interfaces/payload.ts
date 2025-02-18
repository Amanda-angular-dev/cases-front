export interface Payload {
    order: Order; // La orden cargada desde el localStorage
    userDetails: UserDetails; // Datos del formulario del usuario
    finalCanvasImage: string; // Imagen generada en el canvas final (base64)
    rawUploadedImage: string; // Imagen en bruto cargada por el usuario (base64)
  }
  
  export interface Order {
    // Define las propiedades relevantes de la orden
    id: string;
    items: Array<OrderItem>;
    total: number;
    dx: '2d' | '3d'; // Campo que indica si la orden es 2D o 3D
  }
  
  export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }
  
  export interface UserDetails {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      streetName: string;
      streetNumber: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }
  
