import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { Observable, first, firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {
  constructor(private firestore: AngularFirestore, private ngFsAu:AngularFireAuth) { }


  async register(mail:string, clave:string){
    let res:any = null;
    // let mail2:string = "";
    // let clave2:string = "";
    // await this.ngFsAu.currentUser.then(
    //   (a:any)=>{
    //     if(a != null){
    //       this.traerUsu('Usuarios',a?.email).then(
    //         (b:any)=>{
    //           mail2 = b[0].mail;
    //           clave2 = b[0].clave;
    //         }
    //       ) 
    //     }
    //   }
    // ); 

    try {
      // res = (await this.ngFsAu.createUserWithEmailAndPassword(mail, clave));
      // (await this.ngFsAu.currentUser)?.sendEmailVerification().then(
      //   async ()=>{
      //     // console.log("Enviee la verificacion");
      //     // await this.logout();
      //     // if(mail2 != ""){
      //     //   this.login(mail2,clave2);
      //     // }
      // });
      res = await this.ngFsAu.createUserWithEmailAndPassword(mail, clave);
      await (await this.ngFsAu.currentUser)?.sendEmailVerification();
    } catch (error:any) {
      throw error.message;      
    }

    return res;
  }

  async login(mail:string, clave:string){
    let res = null;
    try {
      // console.log("entro al login base de datos");
      res = await this.ngFsAu.signInWithEmailAndPassword(mail, clave);
    }catch(error:any){
      throw error.message;
    }
    return res;
  }

  async logout(){
     try {
      await this.ngFsAu.signOut();
      return;
      // console.log("entre al logout");
     } catch (error) {
      console.log(error);
     }
  }

  getUser(){
    // console.log("entre get");
    // return this.ngFsAu.authState.pipe(first());
    return this.ngFsAu.user;
  }

  traer(db:string){
    const col =  this.firestore.collection(db);
    return col.valueChanges();
  }

  traerUsu(db:string,mail:string){
    const col =  this.firestore.collection(db, ref=>ref.where('mail','==',mail));
    return firstValueFrom(col.valueChanges());
  }

  guardarObjeto(objeto:any, ruta:string)
  {
    // console.log(objeto);
    // console.log(ruta);
    const aux:any = {};
    for (const key in objeto) {
      aux[key] = objeto[key];
    }

    const doc = this.firestore.doc(ruta + "/" + this.firestore.createId());
    aux.id = doc.ref.id;
    doc.set(aux);
  }

  modificarObjeto(objeto:any, ruta:string){
    const doc = this.firestore.doc(ruta + "/" + objeto.id);

    const aux:any = {};
    for (const key in objeto) {
      aux[key] = objeto[key];
    }

    doc.update(aux);
  }

  eliminarObjeto(id:string, ruta:string){
    const doc = this.firestore.doc(ruta + "/" + id);

    doc.delete();
  }

  guardarObjetoSinID(objeto:any, ruta:string)
  {
    // //collection te devuelve la referencia del path pasado o de la path reference pasado
    const col = this.firestore.collection(ruta);
    // //con el add agrega la data a la coleccion referenciada, con un numero de documento creado por defecto
    const aux:any = {};
    for (const key in objeto) {
      aux[key] = objeto[key];
    }
    col.add(aux);
  }
}
