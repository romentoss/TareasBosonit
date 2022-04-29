import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MsgServiceService } from './../../../services/msg-service.service';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {
  @Input() msgInput!:string;
  @Output() msgOutput = new EventEmitter<string>();
  msg:string = "CHILD USING OUTPUT EVENT";
  //Importamos el servicio en el constructor para su uso
  constructor(private msgService:MsgServiceService) { }

  ngOnInit(): void {
    this.msgService.msgHijo
    .subscribe(( texto ) => {
      this.msgInput= texto;
  })
  }

  //Disparamos el output del hijo para que lo emita al padre
  dispararOutput(){
    this.msgOutput.emit(this.msg);
  }
  //Disparamos la funcion del servicio que nos da el texto del padre 
  dispararServiceChild(){
    this.msgService.sendChild('CHILD USING SERVICE')
  }
  //Disparamos la funcion del servicio que nos devolvia un observable y nos suscribimos a este. 
  ObsChild(){
    this.msgService.sendFromChild().subscribe( msg => {
      this.msgOutput.emit(msg)
    })
  }


}
