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
   addOrder(user,email,phone,address,imagenLienzoFinal, originalImageFile): Observable<any> {
    const payload = this.createRequestPayload(user,email,phone,address,imagenLienzoFinal, originalImageFile)
    console.log(payload)
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

  createRequestPayload(user,email,phone,address,imagenLienzoFinal, originalImageFile){
    console.log('user:', user);
    console.log('email:', email);
    console.log('phone:', phone);
    console.log('address:', address);
    console.log('dataURL:', imagenLienzoFinal);
     this.loadOrder()
      // Convertir la imagen Base64 a un archivo tipo Blob
      const blob = this.dataURLtoBlob(imagenLienzoFinal);
      const blob2 = this.dataURLtoBlob(originalImageFile);
      //const blob3 = this.dataURLtoBlob(dataURL3);
      // Crear el FormData para enviar al servidor
      const formData = new FormData();
      formData.append('image', blob, 'canvas-image.png'); // Agregar la imagen
      formData.append('originalImage',blob2 , 'canvas-image.png'); // Imagen original
      //formData.append('tercerImage',blob3 , 'canvas-image.png'); 
      formData.append('productName', this.order.namePhone);
      formData.append('productPrice', this.order.price.toString()); // Convertir a string para FormData
      formData.append('productQuantity', this.order.quantity.toString());
      formData.append('productBorderColor', this.order.borderColor);
      formData.append('dx', this.order.dx);
      formData.append('userName', user);
      formData.append('userEmail', email);
      formData.append('userPhone', phone);
      formData.append('userAddress', address);

     

      return formData; // Devuelve el FormData listo para enviar
 }

 private dataURLtoBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

}
