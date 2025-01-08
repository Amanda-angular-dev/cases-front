export interface Order {
    namePhone: string;   // Nombre del producto (en este caso, el teléfono)
    quantity: number;    // Cantidad del producto
    borderColor: string; // Color del borde en formato hexadecimal
    price: number;       // Precio unitario en centavos
    dx: '2d' | '3d'; 
}
