import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { categorieI } from 'src/app/shared/model/categori.interface';
import { SvcProductosService } from '../../components/product-svc.service';
import { CarcelSvcService } from '../carcel-svc.service';

@Component({
  selector: 'app-carrucell',
  templateUrl: './carrucell.component.html',
  styleUrls: ['./carrucell.component.scss']
})
export class CarrucellComponent implements OnInit {
  name:string;
  email:string;
  public categorias$: Observable<categorieI[]>;

  constructor(private _route:ActivatedRoute, private carruSvc:CarcelSvcService) { 
    
  }

  ngOnInit():void{
    //console.log(this._route.snapshot.paramMap.get('id'));
    this.name = this._route.snapshot.paramMap.get('id');
    this.validBusiness(this.name);
    this.categorias$ = this.carruSvc.getCategoriesView(this.email);
  } 

  validBusiness(name){
    switch (name) {
      case 'la paula': this.email = 'paulavs1998@gmail.com';
          break;
      case 'el neyder': this.email = 'neyderflashh@gmail.com';
          break;
      default:
          console.log("No such day exists!");
          break;
  }
  }

}
