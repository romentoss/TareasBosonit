import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';

export enum colors{
  red = 'red',
  yellow='yellow',
  green='green'
  };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colors = colors;
  showColors:boolean = false;
  selectColor = colors.red;
  title = 'Prueba1';

}
