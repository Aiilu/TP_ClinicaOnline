import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicTurnosComponent } from './solic-turnos/solic-turnos.component';

const routes: Routes = [
  {path:'', component:SolicTurnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MSolicTurnosRoutingModule { }
