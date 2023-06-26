import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirectivaUno]'
})
export class DirectivaUnoDirective {
    constructor(private el: ElementRef) {}
    
    @HostListener('focusin') onFocus()
    {
      this.el.nativeElement.style.color = 'red';
    }

    @HostListener('focusout') endFocus()
    {
      this.el.nativeElement.style.color = 'black';
    }
}
