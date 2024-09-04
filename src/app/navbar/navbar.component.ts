import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public res:any = {}
constructor(public service: UsersService, public route: Router){}
ngOnInit(){
  this.service.userData.subscribe(result=>{
    // console.log(result);
    this.res = result
  })
  
}
logout(){  
  localStorage.removeItem('easyshareUser_id')
  localStorage.removeItem('easyshareCurrentUser')
  this.route.navigate(['/login'])
}
}
