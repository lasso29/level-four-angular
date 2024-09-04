import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
 // Reactive form for Buy Data
 buyDataForm = this.formBuilder.group({
  network: ['', [Validators.required]],
  plan: ['', [Validators.required]],
  amount: [{value: 0, disabled: true}, [Validators.required]],
  phoneNumber: ['', [Validators.required]],
  pin: ['', [Validators.required]],
  senderAccountNumber: JSON.parse(localStorage['easyshareUser_id'])
  
});

// Reactive form for Buy Airtime
buyAirtimeForm = this.formBuilder.group({
  network: ['', [Validators.required]],
  type: [{value: 'VTU', disabled: true}, [Validators.required]],
  amount: ['', [Validators.required]],
  phoneNumber: ['', [Validators.required]],
  pin: ['', [Validators.required]],
  senderAccountNumber: JSON.parse(localStorage['easyshareUser_id'])
});

constructor(public formBuilder: FormBuilder, public service: UsersService, public route: Router, public http: HttpClient) { }
dataApi:any = ''
selectedNetwork:any = ''
selectedPlan:any = ''
ngOnInit() {

  this.http.get<any>(`${this.service.backendURL}/databundle.php`).subscribe(data=>{
    console.log(data);
    this.dataApi= data.message.details
  })
}

// Function to handle Buy Data form submission
onSubmitBuyData() {
  this.buyDataForm.get('amount')?.enable()
  this.buyDataForm.get('amount')?.setValue(this.selectedPlan.amount)
  const amount: any = this.buyDataForm.value.amount;
  // Format as currency
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);  
  if (this.buyDataForm.valid) {
    // console.log('Buy Data Form Values:', this.buyDataForm.value);
    this.http.post<any>(`${this.service.backendURL}/buydata.php`, this.buyDataForm.value).subscribe(response => {
      if (response.status == true) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: `You have successfully transfer ${this.buyDataForm.value.network} ${this.buyDataForm.value.plan} of ${formattedAmount} to ${this.buyDataForm.value.phoneNumber}`,
          icon: "success"
        });
      }else{
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: response.message,
          icon: "error"
        });
      }
    })
  }
}
networkChange(event: any) {
  const selectedIndex = event.target.selectedIndex-1;
  // console.log(this.buyDataForm.value.network);
    
  const selectedItem = this.dataApi[selectedIndex].plans;
  // console.log(this.dataApi[selectedIndex]);
  // console.log('Selected Item:', selectedItem);
  this.selectedNetwork = selectedItem;
}

networkPlan(event: any) {
  const selectedIndex = event.target.selectedIndex-1;
  this.selectedPlan = this.selectedNetwork[selectedIndex];
  // console.log('Selected Plan:', this.selectedPlan);
}

// Function to handle Buy Airtime form submission
onSubmitBuyAirtime() {
  const amount: any = this.buyAirtimeForm.value.amount;
  // Format as currency
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount); 
  if (this.buyAirtimeForm.valid) {
    // Handle form submission logic for Buy Airtime
    // console.log('Buy Airtime Form Values:', this.buyAirtimeForm.value);
      this.http.post<any>(`${this.service.backendURL}/buyairtime.php`, this.buyAirtimeForm.value).subscribe(response => {
        if (response.status == true) {
          Swal.fire({
            confirmButtonColor: "#3085d6",
            text: `You have successfully transfer ${this.buyAirtimeForm.value.network} airtime of ${formattedAmount} to ${this.buyAirtimeForm.value.phoneNumber}`,
            icon: "success"
          });
        }else{
            Swal.fire({
              confirmButtonColor: "#3085d6",
              text: response.message,
              icon: "error"
            });
          }
      })
  }
}
}
