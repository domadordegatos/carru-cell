import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class NewModule { }
