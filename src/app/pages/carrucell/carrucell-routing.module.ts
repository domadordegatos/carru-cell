import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrucellComponent } from './carrucell.component';

const routes: Routes = [{ path: '', component: CarrucellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrucellRoutingModule { }
