import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunicationHttpService {

  constructor(private http: HttpClient) { }

  // Método para el login
  login(credentials: { user: string; password: string }): Observable<any> {
    return this.http.post(`${environment.url_endpoint}/login`, credentials);
  }

  // Método para el registro
  register(userData: { name: string; password: string; email: string }): Observable<any> {
    return this.http.post(`${environment.url_endpoint}/users/regist`, userData);
  }
}
