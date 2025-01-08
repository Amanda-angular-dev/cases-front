import { Component,  OnInit } from '@angular/core';
import { DisplayMenuService } from '../display-menu.service';

@Component({
  selector: 'app-menu-desplegado',
  templateUrl: './menu-desplegado.component.html',
  styleUrls: ['./menu-desplegado.component.css']
})
export class MenuDesplegadoComponent implements OnInit {
  isCollapsed = false
  

  //esta propiedad aboit esta puesta para esconder el menu,
  //sino al iniciar se ve la animacion de menu hiden
  avoitLookMenuToStart=false
  constructor(private menuService: DisplayMenuService) {}

  ngOnInit() {
    setTimeout(() => {
      this.avoitLookMenuToStart=true
    }, 1000);
    // Suscribirse al Observable para recibir cambios
    this.menuService.menuState$.subscribe((state: boolean) => {
      this.isCollapsed = state;
    });
  }

cerrarMenu(){
  this.menuService.toggleMenu(false)
}


}
