import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertifyMessagesService } from '../../../services/alertify-messages.service';
import { PhoneCasesService } from '../../../services/phone-cases.service';
@Component({
  selector: 'app-agregar-cantidad',
  templateUrl: './agregar-cantidad.component.html',
  styleUrls: ['./agregar-cantidad.component.css']
})
export class AgregarCantidadComponent implements OnInit {
  updateQuantityForm!: FormGroup; // Formulario reactivo para actualizar cantidades
  id!: string; // ID obtenido de la ruta
  nombreCaso!: string; // Nombre del caso recibido de la ruta

  constructor(
    private route: ActivatedRoute,
    private phoneCasesService: PhoneCasesService,
    private fb: FormBuilder,
    private alertyMessagesService:AlertifyMessagesService
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.initializeForms();

    // Obtener el ID de la ruta de manera reactiva
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.nombreCaso = params.get('nombre')!; // Capturamos el nombre desde la ruta
      if (this.id) {
        this.updateQuantityForm.patchValue({ _id: this.id }); // Rellenar automáticamente el ID en el formulario
        console.log('ID actualizado:', this.id);
      }
    });
  }

  // Inicializar formulario reactivo
  private initializeForms(): void {
    this.updateQuantityForm = this.fb.group({
      _id: ['', Validators.required], // El ID es obligatorio
      cantidad: [0, [Validators.required, Validators.min(1)]] // La cantidad debe ser mayor a 0
    });
  }

  // Sumar cantidad a un caso existente
  addQuantity(): void {
    if (this.updateQuantityForm.invalid) {
      console.warn('Formulario inválido:', this.updateQuantityForm.errors);
      return;
    }

    const { _id, cantidad } = this.updateQuantityForm.value;

    this.phoneCasesService.addQuantity(_id, cantidad).subscribe({
      next: (res) => {
        console.log('Cantidad sumada exitosamente:', res);
        this.alertyMessagesService.cantidadAgregadaMessage()
        this.updateQuantityForm.reset({ _id: this.id, cantidad: 0 }); // Resetear formulario manteniendo el ID
      },
      error: (err) => {
        console.error('Error al sumar cantidad:', err);
      }
    });
  }
}

