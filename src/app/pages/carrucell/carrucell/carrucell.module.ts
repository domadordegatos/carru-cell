import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrucellRoutingModule } from './carrucell-routing.module';
import { CarrucellComponent } from './carrucell.component';


@NgModule({
  declarations: [
    CarrucellComponent
  ],
  imports: [
    CommonModule,
    CarrucellRoutingModule
  ]
})
export class CarrucellModule { }
