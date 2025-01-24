import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {}

   // Método para obtener el token del almacenamiento local
   private getToken(): string | null {
    return localStorage.getItem('token'); // Ajusta según donde guardes el token
  }

  // Configuración de encabezados con el token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Método para obtener lA ORDENES POR SU ESTADO
getOrders(status: string = 'pendiente'): Observable<any> {
  return this.http.get(`${environment.url_endpoint}/order?status=${status}`, {
    headers: this.getHeaders(),
  });
}

  // Método para obtener  un producto por su ID
  getOrder(itemId: string): Observable<any> {
    return this.http.get(`${environment.url_endpoint}/order/${itemId}`, {
      headers: this.getHeaders(),
    });
  }
}
