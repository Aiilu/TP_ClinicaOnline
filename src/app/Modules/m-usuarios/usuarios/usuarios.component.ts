import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/Clases/persona';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  formAdmin: FormGroup;
  vista:string = "";
  listado:string = "";
  sus:Subscription = Subscription.EMPTY;
  admins:any[] = [];
  paci:any[] = [];
  esp:any[] = [];
  miAdmin:Persona = new Persona("", "", "", 0, 0, "", "", "", "");
  spinner:boolean = false;
  modal:boolean = false;
  mailP:string = "";
  histClinico:any = null;
  work!:Workbook;

  constructor(private fb: FormBuilder, private servBase:BaseDatosService, private router:Router){
    this.formAdmin = this.fb.group({
      'nombreR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'apellidoR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'edadR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'dniR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
      'claveR': ['', [Validators.required, this.spacesValidator]],
      'fotoR': ['', [Validators.required, this.validarFoto]]
    });
  }

  ngOnInit(){
    this.sus = this.servBase.traer("Usuarios").subscribe((data)=>
    {
      this.esp = [];
      this.paci = [];
      this.admins= [];
      data.forEach(
        (a:any)=>{
          switch (a.perfil) {
            case 'paciente':
              this.paci.push(a);
              break;
            case 'especialista':
              this.esp.push(a);
              break;
            case 'administrador':
              this.admins.push(a);
              break;
          };
        }
      );
    });
  }

  private spacesValidator(control: AbstractControl): null | object {
    const valor = <string>control.value;
    const spaces = valor.includes(' ');

    if(spaces)
    {
      return {containsSpaces: true};
    }
    else
    {
      return null;
    }
  }

  validarFoto(control: AbstractControl): null | object{
    if(control.value != ''){
      if((<File>control.value).type ==  'image/png' || (<File>control.value).type ==  'image/jpeg'){
        return null;
      }
    }
    return {fotoMal:true};
  }

  cambiarVista(valor:string)
  {
    this.vista = valor;
  }

  cambiarListado(valor:string)
  {
    this.listado = valor;
  }

  toggleActivo(esp:any){
    if(esp.activo == true){
      esp.activo = false;
    }else{
      esp.activo = true;
    }
    this.servBase.modificarObjeto(esp,'Usuarios');
  }

  async registrar()
  {
    let mail2 = "";
    let clave2 = "";
    let sus = this.servBase.getUser().subscribe(
      (a:any)=>{
          this.servBase.traerUsu('Usuarios', a?.email).then(
            (b:any[])=>{
              mail2 = b[0].mail;
              clave2 = b[0].clave;
              sus.unsubscribe();
            }
            );
      }
    )

    this.spinner = true;
    let mail:string;
    let clave:string;

    this.miAdmin.nombre = this.formAdmin.value.nombreR;
    this.miAdmin.apellido = this.formAdmin.value.apellidoR;
    this.miAdmin.edad = this.formAdmin.value.edadR;
    this.miAdmin.dni = this.formAdmin.value.dniR;
    this.miAdmin.mail = this.formAdmin.value.emailR.toLocaleLowerCase();
    mail = this.miAdmin.mail;
    this.miAdmin.clave = this.formAdmin.value.claveR;
    clave = this.formAdmin.value.claveR;
    this.miAdmin.perfil = "administrador";
    // this.miAdmin.foto = this.formAdmin.value.fotoR;
    await this.servBase.subirFoto(this.formAdmin.value.fotoR).then(
      resp=>this.miAdmin.foto = <string>resp
    ); 

    this.servBase.register(mail, clave).then(
    async  ()=>{
            await this.servBase.logout();
            await this.servBase.login(mail2,clave2);
            Swal.fire(
              'El usuario ha sido registrado con exito!',
              'Haga click para continuar',
              'success'
            );
            this.servBase.guardarObjeto(this.miAdmin, "Usuarios");
          }
      ).catch(
        (error)=>{
          Swal.fire(
            'error: ' + error,
            'Haga click para continuar',
            'error'
          );
        }
      ).finally(
        ()=>{
          this.spinner = false;
          this.router.navigateByUrl('home');
        }
      );
  }

  marcar(){
    const foto = this.formAdmin.get('fotoR');
    
    if(foto?.untouched){
      foto.markAsTouched();
    }
  }

  selFoto($event:any){
    const foto = this.formAdmin.get('fotoR');

    foto?.setValue($event.target.files[0]);
  }

  mostrarHist(mail:string)
  {
    this.mailP = mail;
    this.modal = true;
  }

  salir()
  {
    this.modal = false;
    this.mailP = "";
  }

  async descargarExcel(paciente:any)
  {
    await this.servBase.traerFiltrado("HistClinico", "paciente.mail", paciente.mail)
    .then((h)=>
    {
      if(h.length != 0)
      {
        this.histClinico = h[0];
      }
    })
    .catch((error)=>
    {
      console.log(error);
    }
   );

   if(this.histClinico == null)
   {
    Swal.fire(
      paciente.nombre + ' no tiene hist. clinico!',
      'Haga click para continuar',
      'error'
    );
   }
   else
   {
    let nombre = "Turnos - " + paciente.nombre + " " + paciente.apellido + ".xlsx";
    this.work = new Workbook();
 
    this.crearTabla();
 
    this.work.xlsx.writeBuffer().then(
      (data)=>
      {
        const blob = new Blob([data]);
        fs.saveAs(blob, nombre);
      }
    );
   }

   this.histClinico = null;
 }

 crearTabla()
{
  //creamos la hoja excel, si no da error al abrir y nos devuelve la instancia de la hoa creada
  const sheet = this.work.addWorksheet("Turnos");
  //en base a la hoja, accedemos a las distintas columnas. El INDICE arranca en 1 o podes usar las letras de las celdas. PODEMOS AGREGARLE ESTILOS A ESA COLUMNA
  sheet.getColumn('B').width = 20;
  sheet.getColumn('C').width = 20;
  sheet.getColumn('D').width = 20;

  //ahora alineas el texto que esta dentro de las columnas, de esta forma, el estilo aplica para TODAS las columnas.
  sheet.columns.forEach((colum)=>
  {
    //con esto le decimos que vamos a darle una alineacion
    colum.alignment = {vertical:'middle', wrapText:true};
  });

  //accedemos a una celda en especifico, al cual le podemos dar un valor y aplicar estilos
  const tittle = sheet.getCell('E2');
  tittle.value = "Turnos de " + this.histClinico.paciente.nombre + " " + this.histClinico.paciente.apellido;
  tittle.style.font = {bold:true, size:24};

  //accedemos A UNA ROW y le insertamos los titulos
  const header = sheet.getRow(4);
  //con value podes establecer un titulo en la posicion, pero tambien podes acceder a values e ir insertando valores sg el orden de esa fila. Internamente estas ingresando las columnas A, B, C, etc. Los objetos son la representacion de cada columna
  header.values = ['', 'Fecha', 'Especialidad', 'Especialista'];
  header.font = {bold:true, size:14};

  //aca le decimos que me traiga una determinada cant de filas, que arranque en el 15 hasta la cantidad que necesito para mostrar todo el array.
  const rowsToInsert = sheet.getRows(5, this.histClinico.resenias.length)!; 

  //vamos a recorrerer cada una de las filas
  for (let index = 0; index < rowsToInsert.length; index++) {
    //nos guardamos la data del array
    const itemData = this.histClinico.resenias[index];
    //y nos guardamos el indice de la row
    const row2 = rowsToInsert[index];

    let fechaS = itemData.fecha.toString();
    let fechaF = fechaS.slice(6,8) + '/' + fechaS.slice(4,6) + '/' + fechaS.slice(2,4); 

    //aca seteamos los elementos de esa row
    row2.values = [
      '',
      fechaF,
      itemData.especialista.especialidad,
      itemData.especialista.nombre + ' ' + itemData.especialista.apellido
    ];

    row2.height = 40;
    row2.alignment = {horizontal: "left", wrapText:true};
  }
 }
}
