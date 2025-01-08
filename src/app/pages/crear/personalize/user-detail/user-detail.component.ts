import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkOrderService } from '../services/work-order.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>(); // Evento para enviar datos al padre
  userFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    private workOrderService:WorkOrderService) { }
  
  
  ngOnInit(): void {
    
    this.userFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Número de 10 dígitos
      address: ['', [Validators.required, Validators.minLength(5)]] // Dirección con mínimo 5 caracteres
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
