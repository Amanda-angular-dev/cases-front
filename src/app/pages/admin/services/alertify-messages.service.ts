import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyMessagesService {

  constructor() { }
  addItemMessage(){
    alertify.success('producto agregado');
  }
  editItemMessage(){
    alertify.success('producto editado');
  }
  cantidadAgregadaMessage(){
    alertify.success('added quantity');
  }
  agregadoMessage(){
    alertify.success('added ');
  }
  deleteItemMessage(){
    alertify.error('producto eliminado'); 
  }
  errorServer(){
    alertify.error('error en el servidor, intente luego'); 
  }
  invalidUser(){
    alertify.error('el usuario o contraseña fue incorrecta'); 
  }
  ordenActualizada(estado:string){
    alertify.success('se actualizo el estado de la orden a:',estado);
  }
}
