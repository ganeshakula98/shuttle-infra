import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    console.log('drag start');
    const elementId = event.target.id;
    // it will all the possible id and text that is required, which can be sent to dropZone
    event.dataTransfer.setData('text', elementId);
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: any) {
      event.preventDefault();
  }
}