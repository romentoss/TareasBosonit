
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/users';






@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})


export class TablaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() userList!:User[];
  @Output() updateUser = new EventEmitter<User>();

  constructor( private http:HttpClient,
            private aps:ApiService ) { }
  
  public async getData():Promise<Observable<any>>{
    return this.http.get<any>("http://localhost:3000/users").toPromise();
  }

  async initPage(){
    
    let result =await this.getData();
    console.log(result);
    
  };

  ngOnInit(): void {
      this.aps.listUsers().subscribe((data) => {
        this.userList = data;
      })
  }

  updateUserById(user:string){
    this.aps.getUserId(user).subscribe((data)=>{
      this.updateUser.emit(data);
      this.ngOnInit();
    });
  }
  deleteUserById(user:string){
    this.aps.deleteUser(user).subscribe(()=>{
      this.ngOnInit();
    });
  }


}
