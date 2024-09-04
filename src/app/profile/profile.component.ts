import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  style: string = "";
  msg: string = "";
 public res:any = {}
 public updateProfileForm:any = {}
  constructor(private fb: FormBuilder, public http: HttpClient, public service: UsersService,public route:Router) {}

  ngOnInit() {
    this.service.userData.subscribe(response => {
      this.res = response;
      this.updateProfileForm = this.fb.group({
        firstname: [this.res.firstname, Validators.required],
        middlename: [this.res.middlename], 
        lastname: [this.res.lastname, Validators.required],
        email: [{value: this.res.email, disabled: true}],
        phoneNumber: [{value: this.res.phone_number, disabled: true}, Validators.required], 
        nationalId: [this.res.national_id], 
        country: [{value: this.res.country, disabled: true}, Validators.required], 
        dateOfBirth: [{value: this.res.date_of_birth, disabled: true}, Validators.required], 
        gender: [this.res.gender, Validators.required], 
        accountnumber: [this.res.accountnumber, Validators.required]
      });
      
    });
    
  }

 
  

  onUpdateProfileSubmit() {
    if (this.updateProfileForm.valid) {
      // console.log(this.updateProfileForm.value);
      
      this.http.post<any>(`${this.service.backendURL}/updateprofile.php`,this.updateProfileForm.value).subscribe(response => {
        //  console.log(response);
         
        this.service.userData.next(this.updateProfileForm.value)
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: response.message,
          icon: "success"
        });
        this.route.navigate(['/dashboard'])
      })
    } else {
      this.msg = 'Please fill in all required fields with valid values';
      this.style = 'error';
    }
  }
}
