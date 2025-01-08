import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBorderColor'
})
export class FilterBorderColorPipe implements PipeTransform {
  transform(items: any[], color: string): any[] {
    if (!items || !color || color === 'all') {
      return items; // Devuelve todos los ítems si no hay filtro
    }
    return items.filter(item => item.borderColor === color);
  }

  

}
