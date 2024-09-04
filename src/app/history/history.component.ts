import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  public res:any = {}
  public accNo: any = ''
  constructor(public http: HttpClient, public service: UsersService){}
  ngOnInit(){
    this.service.userData.subscribe(result=>{
      this.accNo = result.accountnumber
      // console.log(this.accNo);
      this.http.post<any>(`${this.service.backendURL}/history.php`,this.accNo).subscribe(response=>{
         this.res=response
        //  console.log(this.res);
         
      })
    })
      
  }
}
