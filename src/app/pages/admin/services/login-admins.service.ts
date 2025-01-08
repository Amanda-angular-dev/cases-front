import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginAdminsService {

  constructor(private http:HttpClient) { }
 
  loginUser(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.url_endpoint}/admin/login`, credentials);
  }
}
