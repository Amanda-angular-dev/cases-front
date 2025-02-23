import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isThisTypeNode } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class StateGlobalService {
  phones = [
    { nombre: 'Iphone 15' },
    { nombre: 'Iphone 15 Plus' },
    { nombre: 'Iphone 15 Pro' },
    { nombre: 'Iphone 15 Pro Max' },
    { nombre: 'Iphone 16' },
    { nombre: 'Iphone 16 e' },
    { nombre: 'Iphone 16 Plus' },
    { nombre: 'Iphone 16 Pro' },
    { nombre: 'Iphone 16 Pro Max' }
  ];
  
  

  constructor(private http: HttpClient) {
    console.log('PhoneCaseService instanciado');
    
  }

 

  getCases2d(): Observable<any[]> {
    const url = `${environment.url_endpoint}/phone-cases/cases?dx=2d`; // Endpoint con el filtro '2d'
    return this.http.get<any[]>(url); // Realiza la solicitud y devuelve un observable
  }

  // Obtener todos los casos 3D
  getCases3d(): Observable<any[]> {
    const url = `${environment.url_endpoint}/phone-cases/cases?dx=3d`; // Endpoint con el filtro '3d'
    return this.http.get<any[]>(url); // Realiza la solicitud y devuelve un observable
  }

  obtenerCantidadPorNombreYBorderColor(array, borderColor, nombre) {
    // Buscar el documento que coincida con los valores de nombre y borderColor
    const documento = array.find(item => item.borderColor === borderColor && item.nombre === nombre);
    console.log('se encontro este document'+documento)
    // Retornar el valor de cantidad si el documento existe, de lo contrario retornar null o un mensaje
    return documento.cantidad 
  }
}