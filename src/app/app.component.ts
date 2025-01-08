import { Component } from '@angular/core';
import { StateGlobalService } from './core/services/state-global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coverhprone';
  constructor(private stateGlobalService:StateGlobalService){}
}
