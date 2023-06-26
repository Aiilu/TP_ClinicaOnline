import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirectivaTres]'
})
export class DirectivaTresDirective {

  constructor(private el: ElementRef) {
    console.log('aaaa');
  }
  
  @HostListener('animationend') animationEnd()
  {
    this.el.nativeElement.focus();
  }

  @HostListener('focusin') focus()
  {
    this.el.nativeElement.style.border = 'solid 2px green';
  }

  @HostListener('focusout') focusEnd()
  {
    this.el.nativeElement.style.border = 'none';
  }
}
