import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[], filtro: string): any[] {
    if(filtro == ''){
      return lista;
    }

    return lista.filter(
      (e)=>{
        return (e.especialista.nombre.toLocaleUpperCase().includes(filtro) ||
                e.especialista.apellido.toLocaleUpperCase().includes(filtro) ||
                e.especialista.especialidad.toLocaleUpperCase().includes(filtro)
        );
      });
  }

}
