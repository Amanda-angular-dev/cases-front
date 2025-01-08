import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admins'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  registerAdmin(admin: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.url_endpoint}/admin/regist-admin`, admin);
  }
}