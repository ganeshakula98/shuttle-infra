import { Component } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {

  allowDrop(ev: any) {
    // console.log(ev);
    
    // ev.preventDefault();
  }

  dropHandler(e: any) {
    // console.log(e);
    
  }

}
