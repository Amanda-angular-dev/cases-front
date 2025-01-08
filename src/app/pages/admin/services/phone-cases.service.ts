import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhoneCasesService {
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

  // Obtener todos los casos 2d
  getCases2d(): Observable<any> {
    console.log('getCases() llamado');
    return this.http.get(`${environment.url_endpoint}/phone-cases/cases2d`);
  }

  // Obtener todos los casos 3d
  getCases3d(): Observable<any> {
    console.log('getCases() llamado');
    return this.http.get(`${environment.url_endpoint}/phone-cases/cases3d`);
  }
  // Agregar un nuevo caso
  addCase(name: string, cantidad: number): Observable<any> {
    return this.http.post(
      `${environment.url_endpoint}/phone-cases/cases`,
      { name, cantidad },
      { headers: this.getHeaders() }
    );
  }

  // Sumar cantidad a un caso existente
  addQuantity(_id: string, cantidad: number): Observable<any> {
    return this.http.put(
      `${environment.url_endpoint}/phone-cases/cases/add-quantity`,
      { _id, cantidad },
      { headers: this.getHeaders() }
    );
  }

  // editarr cantidad a un caso existente
  editQuantity(_id: string, cantidad: number,nota: string): Observable<any> {
    return this.http.put(
      `${environment.url_endpoint}/phone-cases/cases/edit-quantity`,
      { _id, cantidad,nota },
      { headers: this.getHeaders() }
    );
  }

editartodos(): Observable<any> {
    console.log('getCases() llamado');
    return this.http.put(`${environment.url_endpoint}/phone-cases/cases/all`,{});
  }
}
