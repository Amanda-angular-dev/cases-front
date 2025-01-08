import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductHistoryService } from '../../../services/product-history.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ver-detalles',
  templateUrl: './ver-detalles.component.html',
  styleUrls: ['./ver-detalles.component.css']
})
export class VerDetallesComponent implements OnInit {

  history: any[] = [];
  itemId!: string;

  constructor(
    private route: ActivatedRoute,
    private productHistoryService: ProductHistoryService
  ) {}

  ngOnInit(): void {
    // Suscribirse al parámetro de la ruta y obtener los datos
    this.route.params
      .pipe(
        switchMap((params) => {
          this.itemId = params['itemId'];// Asignar el ID de la ruta
          console.log(this.itemId)
          return this.productHistoryService.getProductHistory(this.itemId);
        })
      )
      .subscribe(
        (data) => {
          console.log(data)
          this.history = data;
        },
        (error) => {
          console.error('Error al obtener el historial:', error);
        }
      );
  }
 
  deleteRecord(index: number, _id: string): void {
    this.productHistoryService.deleteProduct(_id).subscribe(
      (response) => {
        console.log('Producto eliminado:', response);
        // Eliminar el registro del array local
        this.history.splice(index, 1);
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  } 
  
}
