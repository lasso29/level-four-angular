import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  public res: any = {}
  public bankList:any=[]
  constructor(public fb: FormBuilder, public service: UsersService, public http: HttpClient) { }
  public accountNumber: any = JSON.parse(localStorage['easyshareUser_id'])

  ngOnInit(){
 
    this.http.get<any>(`${this.service.backendURL}/banklist.php`).subscribe(result=>{
      this.bankList=result.data
      // console.log(this.bankList);
      
    })
  }

  public form = this.fb.group({
    accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    bank: ['EasyShare', Validators.required],
    amount: ['', Validators.required],
    pin: ['', Validators.required],
    notes: [''],
    senderAccountNumber: this.accountNumber

  })

  onSubmit() {
    const amount: any = this.form.value.amount;
    // Format as currency
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);

    // console.log(formattedAmount);
    if (this.form.value.accountNumber==this.accountNumber) {
      Swal.fire({
        confirmButtonColor: "#3085d6",
        title: "Transfer to other accounts",
        text: `${this.accountNumber} is your Account number`,
        icon: "error"
      });
    }
   else{
    // console.log(this.form.value);
    
    this.http.post(`${this.service.backendURL}/accountChecker.php`, this.form.value).subscribe(response => {
      console.log(response);
      this.res = response
      if (this.res.status == false) {
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: this.res.message,
          icon: "error"
        });

      } else {
        Swal.fire({
          title: "Are you sure?",
          text: `Send ${formattedAmount} to ${this.res.data.account_name}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm"
        }).then((result) => {
          if (result.isConfirmed) {
            this.http.post(`${this.service.backendURL}/transfer.php`, this.form.value).subscribe(result => {
              // console.log(result);
              this.res = result
              if (this.res.status == false) {
                Swal.fire({
                  confirmButtonColor: "#3085d6",
                  text: this.res.message,
                  icon: "error"
                });
              } else {
                Swal.fire({
                  confirmButtonColor: "#3085d6",
                  text: this.res.message,
                  icon: "success"
                });
              }
            })
          }
        });
      }
    })
    // console.log(this.form.value);
  }
  }
}
