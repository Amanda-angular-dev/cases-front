import { Component, OnInit } from '@angular/core';
import { DisplayMenuService } from './display-menu.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  constructor(private menuService: DisplayMenuService) {}

  ngOnInit(): void {
    this.menuService.menuState$.subscribe((state: boolean) => {
      this.isCollapsed = state;
    });
  }
  collapsedToggle(){
    this.isCollapsed =!this.isCollapsed
    this.menuService.toggleMenu(this.isCollapsed)
  }
  recibirMensaje(event: Event) {
    this.menuService.toggleMenu(true)
  }
}
