import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayMenuService {
  private menuState = new BehaviorSubject<boolean>(false); // Estado inicial: cerrado
  menuState$ = this.menuState.asObservable(); // Observable para que los componentes se suscriban

  // Método para cambiar el estado del menú
  toggleMenu(state: boolean) {
    this.menuState.next(state);
  }
  constructor() { }
}
