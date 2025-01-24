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
    productBorderColor: string,
    
    dx: string,
    id: string,
    imagen: string
  ): Observable<{ id: string }> {
    const body = {
       productName,
      productPrice,
      productQuantity,
      productBorderColor,
      dx,
      id,

      imagen
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

  
}