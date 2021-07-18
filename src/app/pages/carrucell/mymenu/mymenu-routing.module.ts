import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MymenuComponent } from './mymenu.component';

const routes: Routes = [{ path: '', component: MymenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MymenuRoutingModule { }
