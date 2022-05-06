
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/users';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
