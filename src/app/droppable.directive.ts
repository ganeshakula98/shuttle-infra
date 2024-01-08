import { Directive, HostListener, Renderer2, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { SVGService } from './svg.service';
import { OverlayContainerComponent } from './overlay-container/overlay-container.component';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggedElement: any;
  private isDragging: any;
  private dropzone!: SVGElement;

  constructor(private svgService: SVGService, private rend2: Renderer2, private viewContainerRef: ViewContainerRef) { }

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
    this.rend2.listen(copySvg, 'click', (event) => this.handleSVGClick(copySvg, event));


    this.dropzone.appendChild(copySvg);
  }

  handleSVGClick(copySvg: SVGElement, event: any) {

    let rectX = parseFloat(copySvg.getAttribute('x') as any) + 60;
    let rectY = parseFloat(copySvg.getAttribute('y') as any) - 50;

    // Create a new SVG group (g) element to contain the rect and images
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Create a new SVG rect element
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject') as SVGForeignObjectElement;
    foreignObject.setAttribute('x', rectX.toString());
    foreignObject.setAttribute('y', rectY.toString());
    foreignObject.setAttribute('width', '60');
    foreignObject.setAttribute('height', '150');


    const componentRef = this.viewContainerRef.createComponent(OverlayContainerComponent);
    componentRef.instance.serviceId = 'EC2';
    foreignObject.appendChild(componentRef.location.nativeElement);

    group.appendChild(foreignObject);
    this.dropzone.appendChild(group);
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