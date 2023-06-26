import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltradoComponent } from './filtrado/filtrado.component';
import { FiltroPipe } from './Pipes/filtro.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComentarioComponent } from './comentario/comentario.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { MPipesModule } from '../m-pipes/m-pipes.module';
import { MDirectivasModule } from '../m-directivas/m-directivas.module';



@NgModule({
  declarations: [
    FiltradoComponent,
    FiltroPipe,
    ComentarioComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MPipesModule,
    MDirectivasModule
  ],
  exports: [
    FiltradoComponent
  ]
})
export class MFiltradoModule { }
