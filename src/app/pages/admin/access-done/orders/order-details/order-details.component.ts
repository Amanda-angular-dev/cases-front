import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertifyMessagesService } from '../../../services/alertify-messages.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order
  itemId!: string;
  urlWeb= environment.url_endpoint
  constructor(
    private route: ActivatedRoute,
    private ordersService:OrdersService,
    private http: HttpClient,
    private messajes:AlertifyMessagesService
  ) {}

  ngOnInit(): void {
    // Suscribirse al parámetro de la ruta y obtener los datos
    this.route.params
      .pipe(
        switchMap((params) => {
          console.log('Parámetros recibidos:', params); // Verifica si cambia el itemId
          this.itemId = params['itemId'];// Asignar el ID de la ruta
          console.log(this.itemId)
          return this.ordersService.getOrder(this.itemId);
        })
      )
      .subscribe(
        (data: any[]) => {
          console.log('Array recibido:', data);
          // Buscar el objeto correcto en el array
          this.order = data.find((item) => item._id === this.itemId);
          
          },
        (error) => {
          console.error('Error al obtener el historial:', error);
        }
      );
  }
  changeOrderStatusToRealizada(order): void {
    if (order.status === 'pagada') {
      order.status= 'realizada';
      this.ordersService.updateOrderStatus(order._id,order.status)
      .subscribe(
        (data: any) => {
          this.messajes.ordenActualizada('realizada')
          
          },
        (error) => {
          console.error('Error al obtener el historial:', error);
        }
      );
    }
    
  }
  changeOrderStatusToEntregada(order): void {
    if (order.status === 'realizada') {
      order.status= 'entregada';
      this.ordersService.updateOrderStatus(order._id,order.status)
      .subscribe(
        (data: any) => {
          this.messajes.ordenActualizada('entregada')
          
          },
        (error) => {
          console.error('Error al obtener el historial:', error);
        }
      );
    }
    
  }
}
