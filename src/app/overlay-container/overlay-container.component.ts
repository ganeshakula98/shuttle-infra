import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss']
})
export class OverlayContainerComponent {

  @Input() serviceId!: string;

}
