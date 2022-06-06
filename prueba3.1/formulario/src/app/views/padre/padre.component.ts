import { EmailvalidatorService } from './../../services/emailvalidator.service';
import { ValidatorService } from './../../services/validator.service';
import { FormularioComponent } from './../formulario/formulario/formulario.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, iif, Observable, switchMap, tap } from 'rxjs';
import { Countries } from 'src/app/interfaces/countries';
import { User } from 'src/app/interfaces/users';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {
  countries$!: Observable<Countries[]>;
  
  user!:User;
  userList!:User[];
  @ViewChild(FormularioComponent) formFormulario;
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
  constructor(private api:ApiService,
    private vs:ValidatorService,
    private http:HttpClient,
    private fb:FormBuilder,
    private emailValidator:EmailvalidatorService) { 
    
  }
   
  //cuando tenga promo es obligado el email  y sin true promo no es required
  ngOnInit(): void {
    this.countries$ = this.api.getAllCountries();
    this.api.listUsers().subscribe((data) => {
      this.userList = data;
    })  
  }
  ngAfterViewInit() {
    this.form = this.formFormulario.form;
  }

  onSubmit(){
    iif(
      () => this.form.value.id,
      this.api.updateUser(this.form.value),
      this.api.createUser(this.form.value)
    ).pipe(switchMap((data) => {
        this.form.reset();
        return this.api.listUsers().pipe(
            tap((updatedList) => {
              this.userList = updatedList;
            })
          );
        }),
        catchError((e: any) => {
          console.error(e);
          return EMPTY;
        })
      ).subscribe();
  }
  
  updateUser(user:User){  
    this.form.controls["email"].setValidators([this.emailValidator.validateWithParams(user.email)]);
    this.form.patchValue(user);
  }
  // this.form.clearAsyncValidators();
  //   this.form.clearValidators();
  //   this.form.updateValueAndValidity();
  //   let email = this.form.get('email');
  //   email?.clearAsyncValidators();
  //   email?.clearValidators();
  //   email?.updateValueAndValidity();
 
  public async getData():Promise<Observable<any>>{
    return this.http.get<any>("http://localhost:3000/users").toPromise();
  }
  
  async initPage(){ 
    let result =await this.getData();
  };

  updateUserById(user:string){
      this.api.getUserId(user).subscribe((data)=>{
        this.updateUser(data);
      });
  }
  deleteUserById(user:string){
      this.api.deleteUser(user).subscribe(()=>{
        this.api.listUsers().subscribe((data)=>{
          this.userList = data;
        });
      });
  }

}
