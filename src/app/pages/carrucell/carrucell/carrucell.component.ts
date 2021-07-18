import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { categorieI } from 'src/app/shared/model/categori.interface';
import { userI } from 'src/app/shared/model/user.interface';
import { AuthSvcService } from '../../auth/auth-svc.service';
import { CarcelSvcService } from '../carcel-svc.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-carrucell',
  templateUrl: './carrucell.component.html',
  styleUrls: ['./carrucell.component.scss']
})
export class CarrucellComponent implements OnInit {
  name:string;
  email:string;
  public categorias$: Observable<categorieI[]>;
  public dataUser$: Observable<userI[]>;

  constructor(private _route:ActivatedRoute, private carruSvc:CarcelSvcService, private authSvc:AuthSvcService, route:Router) { 
    
  }

  ngOnInit():void{
    //console.log(this._route.snapshot.paramMap.get('id'));
    this.name = this._route.snapshot.paramMap.get('id');
    this.validBusiness(this.name);
    this.categorias$ = this.carruSvc.getCategoriesView(this.email);
    this.dataUser$ = this.carruSvc.getDataView(this.email);
  } 

  validBusiness(name){
    switch (name) {
      case 'la paula': this.email = 'paulavs1998@gmail.com';
          break;
      case 'el neyder': this.email = 'neyderflashh@gmail.com';
          break;
      default:
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Esta empresa no esta registrada! :(',
                    showConfirmButton: true,
                    confirmButtonText: `Pero podria estarlo... LLamanos`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      
                    }
                  })
          break;
  }
  }

}
