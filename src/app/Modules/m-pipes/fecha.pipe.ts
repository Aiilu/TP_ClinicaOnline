import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(numero: number): string {
    let anno = (Math.floor(numero/10000)).toString();
    let mesdia = numero%10000;
    let mes = (Math.floor(mesdia/100)).toString();
    let dia = (mesdia%100).toString();
    return (dia + '/' + mes + '/' + anno);
  }

}
