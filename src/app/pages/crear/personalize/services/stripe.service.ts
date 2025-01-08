import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { WorkOrderService } from './work-order.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe(environment.key_public_stripe); // Clave pública de Stripe

  constructor(private http: HttpClient,
              private workOrderService:WorkOrderService) {}

  // Crear sesión de Stripe Checkout usando un observable
  createCheckoutSession(
    productName: string,
    productPrice: number,
    productQuantity: number,
    borderColor: string
  ): Observable<{ id: string }> {
    const body = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      borderColor: borderColor,
    };

    return this.http.post<{ id: string }>(
      `${environment.url_endpoint}/create-checkout-session`,
      body
    );
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

  // Subir imagen al backend
  uploadImage(imageBase64: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', imageBase64);

    return new Promise((resolve, reject) => {
      this.http.post<{ imageUrl: string }>(
        `${environment.url_endpoint}/upload`,
        formData
      ).subscribe(
        (response) => {
          if (response.imageUrl) {
            resolve(response.imageUrl);
          } else {
            reject('No se pudo obtener la URL de la imagen');
          }
        },
        (error) => reject(error)
      );
    });
  }
}