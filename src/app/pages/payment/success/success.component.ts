import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent  {

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']); // Cambia '/home' según tu ruta principal
  }

}
