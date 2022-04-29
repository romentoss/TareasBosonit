import { Component, OnInit } from '@angular/core';
import { MsgServiceService } from './../../../services/msg-service.service';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {
  msgInput!:string;
  msgOutput:string="";

  constructor( private msgService:MsgServiceService ) { }

  ngOnInit(): void {
    this.msgService.msgPadre
    .subscribe(( texto ) => {
      this.msgOutput= texto;
  })
  }
  //disparamos el input del padre 
  dispararInput(){
    this.msgInput =  "PARENT USING INPUT PROPERTY";
  }
  //disparamos la función del componente hijo. 
  mostrarMsg(event:string){
    this.msgOutput = event;
  }
  //disparamos la función del servicio y le pasamos el parametro
  dispararServiceParent(){
    this.msgService.sendParent('PARENT USING SERVICE')
  }
   //Disparamos la funcion del servicio que nos devolvia un observable y nos suscribimos a este. 
  obsParent(){
    this.msgService.sendFromParent().subscribe(msg =>{
      this.msgInput = msg;
    })
  }


}
