import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe,  Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

import { from, Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe(environment.key_public_stripe); // Clave pública de Stripe
  order: Order = null;
  user
  constructor(private http: HttpClient) {}
// Agregar un nuevo caso// Crear sesión de Stripe Checkout usando un observable
createCheckoutSession(name,lastName,email,phone,streetName,streetNumber,city,state,zipCode,imagenLienzoFinal, originalImageFile): Observable<{ id: string }> {
  const payload = this.createRequestPayload(name,lastName,email,phone,streetName,streetNumber,city,state,zipCode,imagenLienzoFinal, originalImageFile)
  console.log(payload)
  return this.http.post<{ id: string }>(`${environment.url_endpoint}/order/create-checkout-session`,payload);
     
}
  
 
  // Redirige a Stripe Checkout usando un observable
  redirectToCheckout(sessionId: string): Observable<void> {
    return from(
      this.stripePromise.then(async (stripe) => {
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error('Error al redirigir a Stripe:', error.message);
            throw new Error(error.message);
          }
        }
      })
    );
  }

  

  createRequestPayload(name,lastName,email,phone,streetName,streetNumber,city,state,zipCode,imagenLienzoFinal, originalImageFile){
    const orderData = localStorage.getItem('order');
    console.log(orderData)
    if (orderData) {
      this.order = JSON.parse(orderData);
    }
      // Convertir la imagen Base64 a un archivo tipo Blob
      const blob = this.dataURLtoBlob(imagenLienzoFinal);
      const blob2 = this.dataURLtoBlob(originalImageFile);
      //const blob3 = this.dataURLtoBlob(dataURL3);
      // Crear el FormData para enviar al servidor
      const formData = new FormData();
      formData.append('image', blob, 'canvas-image.png'); // Agregar la imagen
      formData.append('originalImage',blob2 , 'canvas-image.png'); // Imagen original
      //formData.append('tercerImage',blob3 , 'canvas-image.png'); 
      formData.append('productName', this.order.namePhone);
      formData.append('productPrice', this.order.price.toString()); // Convertir a string para FormData
      formData.append('productQuantity', this.order.quantity.toString());
      formData.append('productBorderColor', this.order.borderColor);
      formData.append('dx', this.order.dx);
      formData.append('userName', name);
      formData.append('userlastName', lastName);
      formData.append('userEmail', email);
      formData.append('userPhone', phone);
      formData.append('userstreetName', streetName);
      formData.append('userstreetNumber',streetNumber );
      formData.append('userCity',city);
      formData.append('userState',state);
      formData.append('userZipCode',zipCode);

      return formData; // Devuelve el FormData listo para enviar
 }

 private dataURLtoBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
}