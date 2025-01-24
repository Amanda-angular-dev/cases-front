import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../order-details/orders.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  state
  orders =[]
  constructor(private ordersService:OrdersService,private route: ActivatedRoute) { }

  ngOnInit(): void {
      // Obtiene el parámetro `type` de la ruta
      this.route.params.subscribe((params) => {
        this.state = params['state']; // Será `2d` o `3d`
        console.log(this.state)
        this.getOrders(this.state);
      });

    
  }
  
  getOrders(status: string): void {
    if (status === 'pendiente') {
      this.ordersService.getOrders(status).subscribe((orders) => {
        console.log('pendiente',orders)
        this.orders = orders;
        
      });
    } else if (status === 'pagada') {
      this.ordersService.getOrders(status).subscribe((orders) => {
        console.log('pagada',orders)
        this.orders = orders;
      });
    } else if (status === 'realizada') {
      this.ordersService.getOrders(status).subscribe((orders) => {
        console.log('realizada',orders)
        this.orders = orders;
      });
    }else if (status === 'entregada') {
      this.ordersService.getOrders(status).subscribe((orders) => {
        console.log('entregada',orders)
        this.orders = orders;

      });
    }
     else {
      console.error('errores en ordenes get');
    
    }
  }
}