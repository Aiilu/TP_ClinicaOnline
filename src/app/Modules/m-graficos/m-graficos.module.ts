import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MGraficosRoutingModule } from './m-graficos-routing.module';
import { GraficosComponent } from './graficos/graficos.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    GraficosComponent
  ],
  imports: [
    CommonModule,
    MGraficosRoutingModule,
    HighchartsChartModule
  ]
})
export class MGraficosModule { }
