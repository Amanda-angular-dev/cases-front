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
    { nombre: 'iPhone 12 Mini' },
    { nombre: 'iPhone 12' },
    { nombre: 'iPhone 12 Pro' },
    { nombre: 'iPhone 12 Pro Max' },
    { nombre: 'iPhone 13 Mini' },
    { nombre: 'iPhone 13' },
    { nombre: 'iPhone 13 Pro' },
    { nombre: 'iPhone 13 Pro Max' },
    { nombre: 'iPhone 14' },
    { nombre: 'iPhone 14 Plus' },
    { nombre: 'iPhone 14 Pro' },
    { nombre: 'iPhone 14 Pro Max' },
    { nombre: 'iPhone 15' },
    { nombre: 'iPhone 15 Plus' },
    { nombre: 'iPhone 15 Pro' },
    { nombre: 'iPhone 15 Pro Max' },
    { nombre: 'SE Segunda Generación' },
    { nombre: 'iPhone 16' },
    { nombre: 'iPhone 16 Pro' },
    { nombre: 'iPhone 16 Pro Max' }
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