import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyMessagesService } from '../../../services/alertify-messages.service';
import { PhoneCasesService } from '../../../services/phone-cases.service';

@Component({
  selector: 'app-edit-cantidades',
  templateUrl: './edit-cantidades.component.html',
  styleUrls: ['./edit-cantidades.component.css']
})
export class EditCantidadesComponent implements OnInit {

  updateQuantityForm!: FormGroup;
  id!: string;
  nombreCaso!: string;
  cantidadActual: number = 100; // Valor inicial de ejemplo, puede venir de la API
  borderColor!: string; 

  constructor(
    private route: ActivatedRoute,
    private phoneCasesService: PhoneCasesService,
    private fb: FormBuilder,
    private alertifyMessagesService: AlertifyMessagesService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  
    // Obtener los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.nombreCaso = params.get('nombre')!;
      this.borderColor = params.get('borderColor')!;
      const cantidadRuta = params.get('cantidad')!;
      this.cantidadActual = parseInt(cantidadRuta, 10); // Convertir a número
  
      if (this.id) {
        this.updateQuantityForm.patchValue({
          _id: this.id,
          cantidad: this.cantidadActual, // Inicializar con la cantidad de la ruta
        });
      }
    });
  
    // Actualizar cantidad reactivamente
    this.updateQuantityForm.get('cantidadEditar')?.valueChanges.subscribe((value) => {
      this.updateQuantityForm.get('cantidad')?.setValue(this.cantidadActual + (value || 0));
    });
  }
  

  private initializeForms(): void {
    this.updateQuantityForm = this.fb.group({
      _id: ['', Validators.required],
      cantidad: [{ value: this.cantidadActual, disabled: true }], // Campo deshabilitado
      cantidadEditar: [0, [Validators.required]], // Campo editable
      nota: ['']
    });
  }

  editQuantity(): void {
    if (this.updateQuantityForm.invalid) {
      console.warn('Formulario inválido:', this.updateQuantityForm.errors);
      return;
    }

    const { _id, cantidadEditar, nota } = this.updateQuantityForm.value;

    // Calcular la nueva cantidad a enviar
    const nuevaCantidad = this.cantidadActual + cantidadEditar;

    this.phoneCasesService.editQuantity(_id, nuevaCantidad, nota).subscribe({
      next: (res) => {
        this.cantidadActual = nuevaCantidad; // Actualizamos la cantidad actual
        this.alertifyMessagesService.editItemMessage();
        this.updateQuantityForm.reset({ _id: this.id, cantidad: this.cantidadActual, cantidadEditar: 0, nota: '' });
      },
      error: (err) => {
        console.error('Error al sumar cantidad:', err);
      },
    });
  }
}
