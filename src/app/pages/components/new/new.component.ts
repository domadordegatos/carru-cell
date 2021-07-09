import { userI } from 'src/app/shared/model/user.interface';
import { Observable } from 'rxjs';
import { ProductosI } from './../../../shared/model/productos.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthSvcService } from '../../auth/auth-svc.service';
import { SvcProductosService } from '../product-svc.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  productos: ProductosI;
  productosForm: FormGroup;
  public viewUser:any = this.afAuth.usuario;
  productosList$ = this.productosSvc.productos;
  categoriasList$ = this.productosSvc.categorias;
  public idSelect:string;

  public image:any;
  navigationExtras:NavigationExtras={
    state:{
      value:null
    }
  };

  constructor(private afAuth:AuthSvcService ,private router:Router, private fb: FormBuilder, private productosSvc:SvcProductosService) {
    const navigation =  this.router.getCurrentNavigation();
    this.productos = navigation?.extras?.state?.value;
    this.initForm();
  }

  onSelect(e:any){
    console.log("hola",e.target.value);
    this.idSelect = e.target.value;
    document.getElementsByName('categoria')[0]['value'] = this.idSelect;
  }
  
  ngOnInit(): void {
    if(typeof this.productos == 'undefined'){
      this.router.navigate(['new']);
    }else{
      this.productosForm.patchValue(this.productos);
    }
  }
  
  onGoToEdit(item: any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(empId:string):Promise<void>{
    Swal.fire({
      title: 'Seguro quieres borrarlo?',
      showDenyButton: true,
      confirmButtonText: `Segurisimo`,
      confirmButtonColor: '#02b875',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try{
          await this.productosSvc.onDeleteProductos(empId);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado!',
            showConfirmButton: false,
            timer: 1500
          })
        }catch(err){
          console.log(err);
        }
      }
    })
  }

  handleImage(event:any): void{
    this.image = event.target.files[0];
  }

  isValidField(field: string): string{
    const validatedField = this.productosForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave():void{
    /* console.log('saved', this.productosForm.value); */
    if(this.productosForm.valid){
      const employee = this.productosForm.value;
      const employeeId = this.productos?.id || null;
      this.productosSvc.preAddAndUpdatePost(employee,employeeId,this.image);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.productosForm.reset();
    }
  }

  private initForm(): void{
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion:['', [Validators.required]],
      imagen:['', [Validators.required]],
      /* email:[this.viewUser.email], */
    })
  }

}
