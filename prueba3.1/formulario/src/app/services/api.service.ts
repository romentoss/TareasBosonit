
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Countries } from '../interfaces/countries';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = 'https://restcountries.com/v2/all';
  url:string = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  getAllCountries(){
    return this.http.get<Countries[]>(`${this.api}`);
  }
  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }
  getUserId(userID:string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userID}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}`, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  camposIguales(campo1:string,campo2:string){
    return (formGroup:AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if(pass1 !== pass2){
        formGroup.get(campo2)?.setErrors({noIguales:true});
        return {noIguales:true};
      }
      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }
    
  


}
