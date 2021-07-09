import { userI } from 'src/app/shared/model/user.interface';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Component } from '@angular/core';
import { AuthSvcService } from 'src/app/pages/auth/auth-svc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthSvcService]
})
export class HeaderComponent{
  public user$: Observable<userI> = this.authSvc.afAuth.user;
  public viewUser:any = this.afAuth.usuario;

  constructor(public afAuth:AuthSvcService ,public authSvc: AuthSvcService, private route:Router) {
    /* console.log("todo",this.viewUser); */
  }

  async onLogout(){
    try{
      await this.authSvc.logout();
      this.route.navigate(['/login']);
    }catch(err){
      console.log("err vista",err);
    }
  }

}
