import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent  {

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']); // Cambia '/home' según tu ruta principal
  }

}
