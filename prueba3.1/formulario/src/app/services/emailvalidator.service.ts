import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailvalidatorService {

  //closUR Buscarrrr!!
  constructor(private http:HttpClient) { }
  validateWithParams = (originalEmail:string|null) =>
  {
    return (control: AbstractControl):  Observable<ValidationErrors | null>=>{
      const email = control.value;
      console.log("email: ",email);
      
      return email && email===originalEmail ? of(null) : this.http.get<any[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        // delay(3000),
        map(resp =>{
          return !resp.length ? null : {emailExists:true};
        })
      )
    }
  }
  
}
