import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailvalidatorService implements AsyncValidator {
 

  constructor(private http:HttpClient) { }
  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
    console.log("email: ",email);
    
    return this.http.get<any[]>(`http://localhost:3000/users?q=${email}`)
    .pipe(
      // delay(3000),
      map(resp =>{
        return (resp.length === 0) ? null : {emailExists:true};
      })
    )
  }

  // validate(val: number): ValidatorFn {
 
  //   return (control: AbstractControl): ValidationErrors | null => {
   
  //     let v: number = +control.value;
   
  //     if (isNaN(v)) {
  //       return { 'gte': true, 'requiredValue': val }
  //     }      
   
  //     if (v <= +val) {
  //       return { 'gte': true, 'requiredValue': val }
  //     } 
        
  //     return null;
      
  //   }
   
  // }
}
