import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authSvc:AuthSvcService, private route:Router) { }

  ngOnInit(): void {
  }

  async onReset(){
    try{
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Email sent, check your inbox!',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(['/login'])
    }catch(err){
      console.log("erro vista",err);
    }
  }

}
