import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHistoryService {

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

  // Método para obtener el historial de un producto por su ID
  getProductHistory(itemId: string): Observable<any> {
    return this.http.get(`${environment.url_endpoint}/detalles/${itemId}`, {
      headers: this.getHeaders(),
    });
  }

  deleteProduct(_id: string): Observable<any> {
    return this.http.delete(`${environment.url_endpoint}/detalles/${_id}`, {
      headers: this.getHeaders(),
    });
  }
}
