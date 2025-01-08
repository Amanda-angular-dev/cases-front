import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyMessagesService } from '../services/alertify-messages.service';
import { PhoneCasesService } from '../services/phone-cases.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  
 addCaseForm!: FormGroup;

  constructor(
    private phoneCasesService: PhoneCasesService,
    private fb: FormBuilder,
    private alertyMessagesService: AlertifyMessagesService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  // Inicializar formulario reactivo
  private initializeForms(): void {
    this.addCaseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Agregar un nuevo caso con cantidad fija
  addCase(): void {
    if (this.addCaseForm.invalid) {
      return;
    }

    const { name } = this.addCaseForm.value;
    const cantidad = 1; // Siempre enviar cantidad fija

    this.phoneCasesService.addCase(name, cantidad).subscribe({
      next: (res) => {
        console.log('Caso agregado:', res);
        this.addCaseForm.reset();
        this.alertyMessagesService.agregadoMessage();
      },
      error: (err) => {
        console.error('Error al agregar caso:', err);
      }
    });
  }
  editartodos(){
    this.phoneCasesService.editartodos().subscribe({
      next: (res) => {
        console.log('editados', res);
       
      },
      error: (err) => {
        console.error('Error al agregar caso:', err);
      }
    });
  }
}