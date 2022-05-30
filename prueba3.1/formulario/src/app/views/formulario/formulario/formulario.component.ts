import { Countries } from './../../../interfaces/countries';
import {FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  @Input() form!: FormGroup;
  @Input() countries$!: Observable<Countries[]>;
  @Output() childEventEmitter = new EventEmitter<string>();
  
  submit(value: string) {
    this.childEventEmitter.emit(value);
  }
  samePass(password:string, password2:string){
    if(password === password2){
      return true;
    }else{
      return false;      
    }
  }

}
