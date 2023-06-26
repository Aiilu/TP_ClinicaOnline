import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[appDirectivaDos]'
})
export class DirectivaDosDirective {
  constructor(private el: ElementRef) {}
  
  @HostListener('mouseenter') onMousseEnter()
  {
    this.el.nativeElement.classList = [];
    this.el.nativeElement.classList.add('text-success');
    this.el.nativeElement.style.textDecoration = "underline";
  }

  @HostListener('mouseleave') onMousseLeave()
  {
    this.el.nativeElement.classList = [];
    this.el.nativeElement.classList.add('text-white');
    this.el.nativeElement.style.textDecoration = "none";
  }
}
