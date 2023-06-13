import { Injectable, resolveForwardRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { Observable, first, firstValueFrom} from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytes} from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {
  constructor(private firestore: AngularFirestore, private ngFsAu:AngularFireAuth, private storage:Storage) { }


  async register(mail:string, clave:string){
    try {
      await this.ngFsAu.createUserWithEmailAndPassword(mail, clave);
      await (await this.ngFsAu.currentUser)?.sendEmailVerification();
    } catch (error:any) {
      throw error.message;      
      
    } finally {
      return;
    }
  }

  async login(mail:string, clave:string){
    let res = null;
    try {
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
     } catch (error) {
      console.log(error);
     }
  }

  getUser(){
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

  traerFiltrado(db:string, campo:string, valor:any){
    const col =  this.firestore.collection(db, ref=>ref.where(campo,'==',valor));
    return firstValueFrom(col.valueChanges());
  }

  guardarObjeto(objeto:any, ruta:string)
  {
    return new Promise(
      (resolve, reject)=>
      {
        const aux:any = {};
        for (const key in objeto) {
          aux[key] = objeto[key];
        }    

        const doc = this.firestore.doc(ruta + "/" + this.firestore.createId());
        aux.id = doc.ref.id;
        doc.set(aux).then(
          ()=>resolve(true)
        ).catch(
          (err)=>reject(err)
        );
      }
    )
  }

  modificarObjeto(objeto:any, ruta:string){
    return new Promise(
      (resolve, reject)=>
      {
        const doc = this.firestore.doc(ruta + "/" + objeto.id);

        const aux:any = {};
        for (const key in objeto) {
        aux[key] = objeto[key];
        }
        doc.update(aux).then(
          ()=>resolve(true)
        ).catch(
          (err)=>reject(err)
        );
      }
    )
  }

  eliminarObjeto(id:string, ruta:string){
    const doc = this.firestore.doc(ruta + "/" + id);

    doc.delete();
  }

  guardarObjetoSinID(objeto:any, ruta:string)
  {
    const col = this.firestore.collection(ruta);
    const aux:any = {};
    for (const key in objeto) {
      aux[key] = objeto[key];
    }
    col.add(aux);
  }

  subirFoto(file:File){
    return new Promise(
      (resolve)=>{
        const imgRef = ref(this.storage, `fotos/${file.name}`);
        uploadBytes(imgRef,file).then(
          async ()=>{
            resolve(await getDownloadURL(imgRef));
          }
        ).catch(
          (err)=>console.log(err)
        )
      }
    );
  }
}
