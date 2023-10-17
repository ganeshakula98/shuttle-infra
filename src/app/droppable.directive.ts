import { Directive, HostListener } from '@angular/core';
import { SVGService } from './svg.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any;

  constructor(private svgService: SVGService) { }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    const dropzone = event.target as SVGElement;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document.getElementById(droppedElementId) as any;

    const copyDiv = droppedElement.cloneNode(true);
    const copySvg = copyDiv.childNodes[0] as SVGElement;
    const dropLocation = dropzone.getBoundingClientRect();

    copySvg.setAttribute('x', String(event.clientX - dropLocation.x));
    copySvg.setAttribute('y', String(event.clientY - dropLocation.y));

    copySvg.setAttribute('height', '50');
    copySvg.setAttribute('width', '50');

    console.log(copySvg);
    dropzone.appendChild(copySvg);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: any): void {
    this.draggingElement = null;
  }

  private setPosition(element: any, coord: { x: any, y: any }) {
    element.setAttribute('cx', coord.x);
    element.setAttribute('cy', coord.y);
  }
}