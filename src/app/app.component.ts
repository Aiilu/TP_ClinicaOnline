import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {
  title = 'TP_Clinica';

  prepareRoute(oulet:RouterOutlet){
    return oulet && oulet.activatedRouteData && oulet.activatedRouteData['animation'];
  }
}
