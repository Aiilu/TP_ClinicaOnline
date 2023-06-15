import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltradoComponent } from './filtrado/filtrado.component';
import { FiltroPipe } from './Pipes/filtro.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FiltradoComponent,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FiltradoComponent
  ]
})
export class MFiltradoModule { }
