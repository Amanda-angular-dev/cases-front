import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateGlobalService } from 'src/app/core/services/state-global.service';
import { PhoneCasesService } from '../../../services/phone-cases.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {
  cases: any[] = [];
  iphones = [
    { id: 1, name: "iPhone 12 Mini", quantity: 23 },
    { id: 2, name: "iPhone 12", quantity: 8 },
    { id: 3, name: "iPhone 12 Pro", quantity: 15 },
    { id: 4, name: "iPhone 12 Pro Max", quantity: 29 },
    { id: 5, name: "iPhone 13 Mini", quantity: 12 },
    { id: 6, name: "iPhone 13", quantity: 19 },
    { id: 7, name: "iPhone 13 Pro", quantity: 34 },
    { id: 8, name: "iPhone 13 Pro Max", quantity: 27 },
    { id: 9, name: "iPhone 14", quantity: 5 },
    { id: 10, name: "iPhone 14 Plus", quantity: 17 },
    { id: 11, name: "iPhone 14 Pro", quantity: 30 },
    { id: 12, name: "iPhone 14 Pro Max", quantity: 13 },
    { id: 13, name: "iPhone 15", quantity: 21 },
    { id: 14, name: "iPhone 15 Plus", quantity: 9 },
    { id: 15, name: "iPhone 15 Pro", quantity: 14 },
    { id: 16, name: "iPhone 15 Pro Max", quantity: 25 },
    { id: 17, name: "SE Segunda Generación", quantity: 11 },
    { id: 18, name: "iPhone 16", quantity: 32 },
    { id: 19, name: "iPhone 16 Pro", quantity: 18 },
    { id: 20, name: "iPhone 16 Pro Max", quantity: 7 },
  ];
  type: string = '';
  selectedColor: string = 'all';
  
  constructor(private route: ActivatedRoute,private stateGlobalService:StateGlobalService) {}

  ngOnInit(): void {
    
     // Obtiene el parámetro `type` de la ruta
     this.route.params.subscribe((params) => {
      this.type = params['type']; // Será `2d` o `3d`
      console.log(this.type)
      this.getPhoneCases(this.type);
    });
  }

  getPhoneCases(type: string): void {
    if (type === '2d') {
      this.stateGlobalService.getCases2d().subscribe((cases) => {
        this.cases = cases;
      });
    } else if (type === '3d') {
      this.stateGlobalService.getCases3d().subscribe((cases) => {
        this.cases = cases;
      });
    } else {
      console.error('Tipo de phone case no válido:', type);
    }
  }
  
  
}
