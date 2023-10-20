import { Directive, HostListener, Renderer2 } from '@angular/core';
import { SVGService } from './svg.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggedElement: any;
  private isDragging: any;
  private dropzone!: SVGElement;

  constructor(private svgService: SVGService, private rend2: Renderer2) { }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    this.dropzone = event.target as SVGElement;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document.getElementById(droppedElementId) as any;

    const copyDiv = droppedElement.cloneNode(true);
    const copySvg = copyDiv.childNodes[0] as SVGElement;
    const dropLocation = this.dropzone.getBoundingClientRect();

    copySvg.setAttribute('x', String(event.clientX - dropLocation.x - 25));
    copySvg.setAttribute('y', String(event.clientY - dropLocation.y - 25));

    copySvg.setAttribute('height', '50');
    copySvg.setAttribute('width', '50');

    this.rend2.listen(copySvg, 'mousedown', (event) => this.startDrag(event, copySvg));
    this.rend2.listen(copySvg, 'mouseup', () => this.stopDrag());
    this.rend2.listen(copySvg, 'mousemove', (event) => this.drag(event));
    this.dropzone.appendChild(copySvg);
  }

  startDrag(event: MouseEvent, element: SVGElement): void {
    this.isDragging = true;
    this.draggedElement = element;
  }

  stopDrag(): void {
    this.isDragging = false;
  }

  drag(event: MouseEvent): void {
    if (this.isDragging && this.draggedElement) {
      const dropLocation = this.dropzone.getBoundingClientRect();

      const x = String(event.clientX - dropLocation.x - 25);
      const y = String(event.clientY - dropLocation.y - 25);

      this.draggedElement.setAttribute('x', x.toString());
      this.draggedElement.setAttribute('y', y.toString());
    }
  }

}