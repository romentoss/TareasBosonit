import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Countries } from 'src/app/interfaces/countries';
import { User } from 'src/app/interfaces/users';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  countries$!: Observable<Countries[]>
  form!:FormGroup;
  user!:User;
  userList!:User[];

  

  constructor(private api:ApiService) { }
  //cuando tenga promo es obligado el email  y sin true promo no es required
  ngOnInit(): void {
    this.countries$ = this.api.getAllCountries();
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      password2: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      promo: new FormControl(false),
      country: new FormControl(''),
      city: new FormControl('',Validators.required),
    }
    //validar buscar
    );
    
  }
  
  onSubmit(){
    switch(this.form.value.id){
      case '':
        this.api.createUser(this.form.value).subscribe(
          (data)=>{
            this.user = data;
            this.form.reset();
            this.userList.push(this.user);
          });
        break;
      default:
        this.api.updateUser(this.form.value).subscribe(
          (data)=>{
            this.user = data;
            this.form.reset();
            this.api.listUsers().subscribe(
              (data)=>{
                this.userList = data;
              });
          });
        break;
    } 
    
  }
  samePass(password:string, password2:string){
    if(password === password2){
      return true;
    }else{
      return false;      
    }
  }

  updateUser(user:User){
    this.form.patchValue(user);
  }
}
