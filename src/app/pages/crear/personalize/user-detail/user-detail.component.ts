import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>(); // Evento para enviar datos al padre
  userFormGroup!: FormGroup;
  @Output() formValid = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder
   ) { }
  
  
  ngOnInit(): void {
    
    this.userFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Número de 10 dígitos
      address: this.fb.group({
        streetName: ['', [Validators.required, Validators.minLength(3)]], // Nombre de la calle
        streetNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Solo números
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
      })
    });
    // Emitimos si el formulario es válido o no
    this.userFormGroup.statusChanges.subscribe(() => {
      this.formValid.emit(this.userFormGroup.valid);
    });
  }
  onNext() {
    if (this.userFormGroup.valid) {
      this.formSubmitted.emit(this.userFormGroup.value); // Emitir datos al padre
    } else {
      console.log('Formulario inválido');
    }
  }
}
