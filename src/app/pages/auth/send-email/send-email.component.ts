import { Observable } from 'rxjs';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnDestroy{
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthSvcService) { }

  onSendEmail(){
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy(){
    this.authSvc.logout();
  }

}