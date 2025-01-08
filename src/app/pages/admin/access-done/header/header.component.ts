import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  username: string | null = '';

  constructor(private router: Router) {
    this.username = localStorage.getItem('username'); // Supongamos que el nombre de usuario está guardado en localStorage.
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token de autenticación.
    this.router.navigate(['/admin/login']); // Redirigir a la página de login.
  }

}
