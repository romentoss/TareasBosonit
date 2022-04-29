import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MsgServiceService {

  msgPadreSub: string = "PARENT USING SUBJECT";
  msgHijoSub: string = "CHILD USING SUBJECT";
  public  msgPadre: EventEmitter<any> = new EventEmitter();
  public msgHijo: EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  private padreSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.msgPadreSub);       
  private hijoSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.msgHijoSub);

  //Retornamos el mensaje del padre
  sendChild(messsage:string){
    return this.msgPadre.emit(messsage);
  }
  //Retornamos el mensaje del hijo
  sendParent(message:string){
    return this.msgHijo.emit(message);
  }
  //Retornamos el mensaje del padre como observable
  sendFromParent(){
    return this.padreSub.asObservable();
  }
  //Retornamos el mensaje del hijo como observable
  sendFromChild(){
    return this.hijoSub.asObservable();
  }
}

