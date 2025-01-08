import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token para obtener el payload
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del payload
        const isExpired = payload.exp * 1000 < Date.now(); // Comparar el tiempo de expiración con la fecha actual
        if (!isExpired) {
          return true;
        } else {
          console.warn('Token expirado');
        }
      } catch (e) {
        console.error('Error al decodificar el token', e);
      }
    }

    // Redirigir al login si no hay token o está expirado
    this.router.navigate(['/admin/login']);
    return false;
  }
}
