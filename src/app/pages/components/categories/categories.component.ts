import { categorieI } from './../../../shared/model/categori.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { NavigationExtras, Router } from '@angular/router';
import { SvcProductosService } from '../product-svc.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categorias: categorieI;
  categoriasForm: FormGroup;
  categoriasList$ = this.productosSvc.categorias;
  
  constructor(private fb: FormBuilder, private productosSvc:SvcProductosService,private router:Router) {
    this.initForm();
  }
  ngOnInit(): void {
  }
  private initForm(): void{
    this.categoriasForm = this.fb.group({
      categoria: ['', [Validators.required]],
    })
  }

  async onDeleteCategorie(catId:string):Promise<void>{
    Swal.fire({
      title: 'Seguro quieres borrarlo?',
      showDenyButton: true,
      confirmButtonText: `Segurisimo`,
      confirmButtonColor: '#02b875',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try{
          await this.productosSvc.onDeleteCategorie(catId);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado!',
            showConfirmButton: false,
            timer: 700
          })
        }catch(err){
          console.log(err);
        }
      }
    })
  }

  onSaveCategorie(){
    if(this.categoriasForm.valid){
      const employee = this.categoriasForm.value;
      const employeeId = this.categorias?.id || null;
      this.productosSvc.saveCategorie(employee,employeeId);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado!',
        showConfirmButton: false,
        timer: 700
      })
      this.categoriasForm.reset();
    }
  }

}

