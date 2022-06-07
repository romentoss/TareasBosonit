import { Countries } from './../../../interfaces/countries';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailvalidatorService } from 'src/app/services/emailvalidator.service';
import { ValidatorService } from 'src/app/services/validator.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  
  @Input() countries$!: Observable<Countries[]>;
  @Output() childEventEmitter = new EventEmitter<string>();
  
  form:FormGroup = this.fb.group({
    id: [''],
    name: ['',[Validators.required]],
    password: ['',[Validators.required]],
    password2: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email],[this.emailValidator.validateWithParams(null)]],
    promo: [false],
    country: [''],
    city: ['',[Validators.required]],
  },
   {
    validators:[this.vs.sameFields('password','password2')]
   }
  );
  constructor(private fb:FormBuilder,
    private emailValidator:EmailvalidatorService,
    private vs:ValidatorService){

  }
  
  submit(value: string) {
    this.childEventEmitter.emit(value);
  }
  emailRequired() {
    return this.form.get("email")?.errors?.["emailExists"] && this.form.get("email")?.touched;
  }

}
