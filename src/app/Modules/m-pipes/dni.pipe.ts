import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class DniPipe implements PipeTransform {

  transform(value: number | null, ...args: unknown[]): unknown {
    let res = "";
    
    if(value != null)
    {
      let dni = value?.toString();
      // dni.replace
      // dni.split
      // dni.substring
      for (let index = dni.length; index > 0; index-=3) 
      {
        if(index > 3)
        {
          res = "." + dni.substring(index-3, index) + res;
        }
        else
        {
          res = dni.substring(0, index) + res;
        }
      }   
    }

    return res;
  }

}
