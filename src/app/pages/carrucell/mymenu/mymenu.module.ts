import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MymenuRoutingModule } from './mymenu-routing.module';
import { MymenuComponent } from './mymenu.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    MymenuComponent
  ],
  imports: [
    CommonModule,
    MymenuRoutingModule,
    CarouselModule 
  ]
})
export class MymenuModule { }
