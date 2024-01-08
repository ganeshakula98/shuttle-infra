import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOpenOverlayContainer]'
})
export class OpenOverlayContainerDirective {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.elementRef.nativeElement.style = 'color: red';
    // this.elementRef.nativeElement.x = '0';
    // this.elementRef.nativeElement.y = '0';

  }

}
