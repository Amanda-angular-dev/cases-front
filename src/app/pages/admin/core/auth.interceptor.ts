import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verificar si la URL contiene "admin"
    if (req.url.includes('/admin')) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.log('Interceptor ejecutado con error:', error);

            localStorage.removeItem('token'); // Borra el token del localStorage
            alert('Sesión terminada debido a un token vencido.'); // Muestra alerta
            this.router.navigate(['/admin/login']); // Redirige a login
          }
          return throwError(() => error); // Propaga el error
        })
      );
    }

    // Si no es una solicitud de "admin", simplemente continúa
    return next.handle(req);
  }
}
