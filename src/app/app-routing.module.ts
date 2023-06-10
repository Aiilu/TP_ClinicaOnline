import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { NotFoundComponent } from './Componentes/not-found/not-found.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path: 'registro', loadChildren: () => import('./Modules/m-registro/m-registro.module').then(m => m.MRegistroModule)},
  {path: 'usuarios', loadChildren: () => import('./Modules/m-usuarios/m-usuarios.module').then(m => m.MUsuariosModule)},
  {path: 'perfil', loadChildren: () => import('./Modules/m-perfil/m-perfil.module').then(m => m.MPerfilModule)},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
