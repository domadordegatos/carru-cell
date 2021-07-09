import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSvcService } from '../auth-svc.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {
  constructor(private authSvc:AuthSvcService, private route:Router){}

  canActivate(): Observable<boolean>  | Promise<boolean> |  boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user)=> user && this.authSvc.isBusiness(user)),
      tap(CanEditGuard =>{
        if(!CanEditGuard){
          this.route.navigate(['/login']);
        }
      })
    )
  }
  
}
