import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[], filtro:any): any[] {
    // console.log(filtro);
    if(filtro.filtro == ''){
      return lista;
    };

    if(filtro.perfil == 'A'){
      return lista.filter(
        (e)=>{
          return (e.especialista.nombre.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.especialista.apellido.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.especialista.especialidad.toLocaleUpperCase().includes(filtro.filtro)
          );
        }
      );
    };

    if(filtro.perfil == 'P'){
      return lista.filter(
        (e)=>{
          return (e.especialista.nombre.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.especialista.apellido.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.especialista.especialidad.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.calificacion.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.estado.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.info.fecha.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.info.horario.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.altura.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.diagnostico.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.peso.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.presion.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.temperatura.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var1.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var2.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var3.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var1.cant.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var2.cant.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var3.cant.toString().toLocaleUpperCase().includes(filtro.filtro)
          );
        });
    };

    return lista.filter(
      (e)=>{
        return (e.especialista.especialidad.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.calificacion.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.estado.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.paciente.apellido.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.paciente.nombre.toLocaleUpperCase().includes(filtro.filtro)  ||
                  e.info.fecha.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.info.horario.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.altura.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.diagnostico.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.peso.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.presion.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.temperatura.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var1.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var2.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var3.prob.toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var1.cant.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var2.cant.toString().toLocaleUpperCase().includes(filtro.filtro) ||
                  e.resenia.var3.cant.toString().toLocaleUpperCase().includes(filtro.filtro)
        );
      });
  }

}
