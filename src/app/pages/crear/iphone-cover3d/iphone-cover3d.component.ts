
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StateGlobalService } from 'src/app/core/services/state-global.service';
@Component({
  selector: 'app-iphone-cover3d',
  templateUrl: './iphone-cover3d.component.html',
  styleUrls: ['./iphone-cover3d.component.css']
})
export class IphoneCover3dComponent implements OnInit {
  disabled: boolean = false;
  phonesNombres: any[] = [];
  phonesCompletyData: any[] = [];
  selectedPhone: any = null;
  borderColor = 'Choose your border color'
  namePhone = 'Choose your phone'
  price= '90.00'
  dx = '3d'
  quantityControl = new FormControl(1); // Valor inicial
  quantityCase: number = 1;
  messageErrorChoiceAModel=false
  messageErrorChoiceABorder=false
  messageAvaibleQuantity= false
  message = ''
  imageUrl: string = 'iphone-c'; // Valor inicial
  constructor(
              private router: Router,
              private stateGlobalService:StateGlobalService) {}

  ngOnInit(): void {
    this.phonesNombres =  this.stateGlobalService.phones
    this.stateGlobalService.getCases3d().subscribe((data) => {
      this.phonesCompletyData= data;
    });
    
    this.quantityControl.valueChanges.subscribe((value) => {
      this.quantityCase = value;
      console.log('Quantity updated:', this.quantityCase);
    });
  
  }
   
  
  onPhoneSelect(event: Event): void {
    this.messageAvaibleQuantity = true;

    // Obtener el nombre seleccionado directamente
    const selectedName = (event.target as HTMLSelectElement).value;

    // Asignar el nombre seleccionado
    this.namePhone = selectedName;

    if (this.namePhone !== 'Choose your phone') {
       // Remover espacios del nombre del teléfono
      this.imageUrl = `${this.namePhone.replace(/\s+/g, '')}`;
      this.messageErrorChoiceAModel = false; // Oculta el mensaje de error cuando se selecciona un modelo válido
    }

   // Verificar si la selección es válida
   if (this.namePhone !== 'Choose your phone'&&this.borderColor != 'Choose your border color') {
    this.messageErrorChoiceAModel = false;
    this.checkAvailability(this.phonesCompletyData,this.borderColor,this.namePhone)
    }
  }
  onBorderColorChange(event: Event): void {
    this.borderColor = (event.target as HTMLSelectElement).value;

    if (this.borderColor !== 'Choose your border color') {
      this.messageErrorChoiceABorder = false; // Oculta el mensaje de error cuando se selecciona un borde válido
    }
    
    if(this.borderColor != 'Choose your border color'&&this.namePhone !== 'Choose your phone'){
      this.messageErrorChoiceABorder = false
      console.log('border color chequeo '+this.borderColor)
      console.log('nombre celular chequeo '+this.namePhone)
      console.log('array cases 2d '+this.phonesCompletyData)
      this.checkAvailability(this.phonesCompletyData,this.borderColor,this.namePhone)
    }
  }
  saveOrderToLocalStorage(): void {
    if(this.namePhone != 'Choose your phone'){
      this.go()
    }else{
      this.messageErrorChoiceAModel = true
    }
    if(this.borderColor != 'Choose your border color'){
      this.go()
    }else{
      this.messageErrorChoiceABorder = true
    }
  }
  go(){
    if(this.namePhone != 'Choose your phone' && this.borderColor != 'Choose your border color'){
      const order = {
        namePhone: this.namePhone,
        quantity: this.quantityCase,
        borderColor: this.borderColor,
        price:this.price,
        dx:this.dx
      };
      console.log('Pre-Save Order:', {
        namePhone: this.namePhone,
        quantity: this.quantityCase,
        borderColor: this.borderColor,
        price: '90.00',
        dx: '3d'
      });
      localStorage.setItem('order', JSON.stringify(order));
      console.log('Order saved desde phone 3d:', order);
      this.router.navigate(['/create/personalize']);
    } 
  }

  checkAvailability(array: any[], borderColor: string, name: string) {
    const quantity = this.stateGlobalService.obtenerCantidadPorNombreYBorderColor(
      array,
      borderColor,
      name
    );

    if (quantity > 0) {
      this.message = `Available: ${quantity} units.`;
      this.disabled=false
    } else {
      this.message = `No units available for the model "${name}"\n with border color "${borderColor}" at the moment.\n We will have more soon, or you can try another border color.`;
      this.disabled=true
    }
  }
}