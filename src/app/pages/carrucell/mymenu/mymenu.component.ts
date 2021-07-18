import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mymenu',
  templateUrl: './mymenu.component.html',
  styleUrls: ['./mymenu.component.scss']
})
export class MymenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true, //bucle
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false, //botones
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
        0: { items: 1},
      400: { items: 1},
      740: { items: 1},
      940: { items: 1}
    },
    nav: true
  }


}
