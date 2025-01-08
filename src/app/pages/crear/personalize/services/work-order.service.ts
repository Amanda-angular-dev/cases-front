import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/pages/crear/personalize/interfaces/order';
import { environment } from 'src/environments/environment';
import { Payload } from '../interfaces/payload';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  order: Order = null;
  user
  constructor(private http: HttpClient) {}

  private getDataForOrder(){
    this.loadOrder();
  }

   // Agregar un nuevo caso
   addOrder(): Observable<any> {
    const payload = this.createRequestPayload()
    return this.http.post(`${environment.url_endpoint}/order/`,payload);
       
  }
  getOrderData(){
    const orderData = localStorage.getItem('order');
    this.order = JSON.parse(orderData);
    console.log(this.order)
    return this.order
  }
  loadOrder(): void {
    //obtener los datos de la orden, estos se graban en el localstorage cuando el usuario elige en las secciones de elegir phone case
    const orderData = localStorage.getItem('order');
    console.log(orderData)
    if (orderData) {
      this.order = JSON.parse(orderData);
    }

  }

  createRequestPayload(){
    // Obtener la imagen generada en el canvas final como base64
    // const finalCanvasImage = this.finalCanvas.toDataURL();
    this.loadOrder()
    // Crear el objeto con los datos de la orden, el formulario, y las imágenes
    const payload = {
     productName :this.order.namePhone,
     roductPrice : this.order.price, // Precio en centavos
     productQuantity : this.order.quantity,
     productBorderColor : this.order.borderColor, // Color del borde
     userName: 'this.userFormGroup.value',
     userEmail: 'this.userFormGroup.value',
     userPhone: 'this.userFormGroup.value',
     userAddress: 'this.userFormGroup.value',
     //  finalCanvasImage: finalCanvasImage, // Imagen del lienzo final
     //  rawUploadedImage: this.uploadedRawImage, // Imagen en bruto cargada por el usuario
    };

    console.log('Payload enviado:', payload);

    return payload;
 }
}
