
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/users';






@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})


export class TablaComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  @Input() userList!:User[];
  @Output() updateUser = new EventEmitter<User>();
  @Input() user!:User;
  @Output() childEventEmitter = new EventEmitter<string>();
  @Output() childEventEmitter1 = new EventEmitter<string>();
  
  updateUserById(user:User){
    console.log("update");
    
    this.childEventEmitter.emit(user.id);
  }
  deleteUserById(user:User){
    console.log("delete");
    
    this.childEventEmitter1.emit(user.id);
  }

  constructor( private http:HttpClient,
    private aps:ApiService  ) { }

  ngOnInit(){
    // this.aps.listUsers().subscribe((data) => {
    //   this.userList = data;
    // })
  }
  
  // public async getData():Promise<Observable<any>>{
  //   return this.http.get<any>("http://localhost:3000/users").toPromise();
  // }

  // async initPage(){
    
  //   let result =await this.getData();
  //   console.log(result);
    
  // };
  

  
  
  

}
