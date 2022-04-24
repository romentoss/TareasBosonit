import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contador';
  counterInterval!:any; 
  counter:number = 0;
  step=1;
  start(){
  
    this.counterInterval = setInterval(() =>  {this.counter += this.step}, 1000);
   
  }
  pause(){
    clearInterval(this.counterInterval);
  }
  reset(){
    this.counter = 0;
  }
  countUp(){
    this.counter += this.step;
  }
  countDown(){
    this.counter -= this.step;
  }
  initCounter(e:any){
    this.counter =Number(e.target.value);
  }
}
