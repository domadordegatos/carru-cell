import { Component } from '@angular/core';
import { AuthSvcService } from './pages/auth/auth-svc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurantes';
  public viewUser:any = this.afAuth.usuario;
  public verification:boolean;
  constructor(public afAuth:AuthSvcService) {}

  
}
