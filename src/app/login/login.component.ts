import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msg: string = '';
  style: string = '';
  res:any = {}
  constructor(public formBuilder: FormBuilder,public service: UsersService, public route: Router) { }

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
 

  onLoginSubmit() {
    if (this.loginForm.valid) {
      
      this.service.loginUser(this.loginForm.value).subscribe(
        (response) => {
          // console.log(response);
          this.res = response
          if (this.res.status==true) {
            localStorage.setItem('easyshareUser_id',JSON.stringify(this.res.accountnumber))
            this.route.navigate(['/dashboard'])
          }else{
            this.msg = this.res.message;
            this.style = 'alert alert-danger text-center';
          }
        },
        (error) => {
          console.log('Error logining user:', error);
        })
    }
    setTimeout(() => {
      this.msg = ""
      this.style = ""
    }, 3000);
  }
  
}
