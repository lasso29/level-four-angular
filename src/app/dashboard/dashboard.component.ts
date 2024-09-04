import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public user_id:any = ''
  public res:any = {}
  public accNo: any = ''
  constructor(public http: HttpClient, public route: Router,public service: UsersService){}
 ngOnInit(){
  // console.log(this.service.backendURL);
    this.service.userData.subscribe(result=>{
      this.accNo = result.accountnumber
      // console.log(this.accNo);
      this.http.post(`${this.service.backendURL}/history.php`,this.accNo).subscribe(response=>{
        //  this.res=response
         
      })
    })
      
  if (localStorage['easyshareUser_id']) {  
    this.user_id = Number(JSON.parse(localStorage['easyshareUser_id']!))
    this.http.post(`${this.service.backendURL}/dashboard.php`, this.user_id).subscribe(response=>{
      this.res = response
      // console.log(this.res);      
      this.service.userData.next(this.res.data)
      localStorage.setItem('easyshareCurrentUser', JSON.stringify(this.res.data))     
    },(error)=>{
      console.log(error);
      
    })
  }
  else{
    this.route.navigate(['/login'])
  }
  
 }

 uploadImage(e:any){
  console.log(e.target.files[0]);
  const formdata = new FormData()
  const accNo:any = parseFloat(JSON.parse(localStorage['easyshareUser_id']))  
  formdata.append('image', e.target.files[0])
  formdata.append('accountnumber', accNo)
  this.http.post<any>(`${this.service.backendURL}/uploadImage.php`, formdata).subscribe(response=>{
    //  console.log(response);
     this.res.data.profilepic = response.imagePath     
      if (response.status==true) {
          Swal.fire({
              confirmButtonColor: "#3085d6",
              text: response.message,
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

 copyAccountNumber() {
  const accountNumber = this.res.data?.accountnumber;

  this.copyToClipboard(accountNumber);
}

copyToClipboard(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert('Account Number copied to clipboard');
}


}
