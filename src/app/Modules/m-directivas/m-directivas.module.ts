import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivaUnoDirective } from './directiva-uno.directive';
import { DirectivaDosDirective } from './directiva-dos.directive';
import { DirectivaTresDirective } from './directiva-tres.directive';

@NgModule({
  declarations: [
    DirectivaUnoDirective,
    DirectivaDosDirective,
    DirectivaTresDirective
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
    DirectivaUnoDirective,
    DirectivaDosDirective,
    DirectivaTresDirective
  ]
})
export class MDirectivasModule { }
