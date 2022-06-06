
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})


export class TablaComponent{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() userList!:User[];
  @Output() updateUser = new EventEmitter<User>();
  @Input() user!:User;
  @Output() childEventEmitter = new EventEmitter<string>();
  @Output() childEventEmitter1 = new EventEmitter<string>();
  
  updateUserById(user:User){
    
    this.childEventEmitter.emit(user.id);
  }
  deleteUserById(user:User){
    this.childEventEmitter1.emit(user.id);
  }

  constructor( private http:HttpClient,
    private aps:ApiService  ) { }
  
}
