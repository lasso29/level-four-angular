import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.component.html',
  styleUrls: ['./changepin.component.css']
})
export class ChangepinComponent {
  public msg:string = ''
  public style:string = ''
  public res:any ={}
 constructor(public fb: FormBuilder, public http: HttpClient, public service: UsersService){}
 public changePinForm = this.fb.group({
  current_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  new_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  confirm_pin: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
  accountnumber: JSON.parse(localStorage['easyshareCurrentUserAccNo'])
});
public changePasswordForm = this.fb.group({
  current_password: ['', [Validators.required, Validators.minLength(6)]],
  new_password: ['', [Validators.required, Validators.minLength(6)]],
  confirm_password: ['', [Validators.required, Validators.minLength(6)]],
  accountnumber: JSON.parse(localStorage['easyshareCurrentUserAccNo'])
});

onSubmitPin() {
  if (this.changePinForm.valid) {

    if (this.changePinForm.value.new_pin != this.changePinForm.value.confirm_pin) {
      Swal.fire({
        confirmButtonColor: "#3085d6",
        text: "PIN Does not Match!",
        icon: "error"
      });
    }else{
    this.http.post(`${this.service.backendURL}/changepin.php`, this.changePinForm.value).subscribe(response=>{
      this.res = response
      console.log(this.res);
      if (this.res.status==true) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: this.res.message,
          icon: "success"
        });
      }else{
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: this.res.message,
          icon: "error"
        });
        
      }
   
    },(error)=>{
      console.log(error);
      
    })
  }
}
}

onSubmitPassword(): void {
  if (this.changePasswordForm.valid) {
    const confirmPassword = this.changePasswordForm.value.confirm_password;
    const newPassword = this.changePasswordForm.value.new_password;
      if (confirmPassword!= newPassword) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: "Password Does not Match!",
          icon: "error"
        });
      }else{
      this.http.post(`${this.service.backendURL}/changepassword.php`, this.changePasswordForm.value).subscribe(response=>{
        this.res = response
        console.log(this.res);
        if (this.res.status==true) {
          Swal.fire({
            confirmButtonColor: "#3085d6",
            text: this.res.message,
            icon: "success"
          });
        }else{
          Swal.fire({
            confirmButtonColor: "#3085d6",
            text: this.res.message,
            icon: "error"
          });
          
        }
     
      },(error)=>{
        console.log(error);
        
      })
    }
  }
}
}
