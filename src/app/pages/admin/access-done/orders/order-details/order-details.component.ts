import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    private http: HttpClient
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

}
