import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ProductosI } from 'src/app/shared/model/productos.interface';
import { userI } from 'src/app/shared/model/user.interface';
import Swal from 'sweetalert2';
import { CarcelSvcService } from '../carcel-svc.service';

@Component({
  selector: 'app-mymenu',
  templateUrl: './mymenu.component.html',
  styleUrls: ['./mymenu.component.scss']
})
export class MymenuComponent implements OnInit {
  public dataUser$: Observable<userI[]>;
  public platos$: Observable<ProductosI[]>;
  public name:string;
  public categoria:string;
  email:string;
  constructor(private rutas:ActivatedRoute, private carruSvc:CarcelSvcService, private route:Router) { }

  ngOnInit(): void {
    this.name = this.rutas.snapshot.paramMap.get('id');
    this.categoria = this.rutas.snapshot.paramMap.get('cat');
    this.validBusiness(this.name);
    this.dataUser$ = this.carruSvc.getDataView(this.email);
    this.platos$ = this.carruSvc.getInformationCategorieView(this.email,this.categoria);
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
                      this.route.navigate(['/contact-me'])
                    }
                  })
          break;
  }
  }

  customOptions: OwlOptions = {
    loop: true, //bucle
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false, //botones
    navSpeed: 700,
    navText: ['',''],
    responsive: {
        0: { items: 1},
      400: { items: 1},
      740: { items: 1},
      940: { items: 1}
    },
    nav: true
  }


}
