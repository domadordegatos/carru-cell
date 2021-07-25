import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosI } from 'src/app/shared/model/productos.interface';
import Swal from 'sweetalert2'
import { AuthSvcService } from '../../auth/auth-svc.service';
import { SvcProductosService } from '../product-svc.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  productos: ProductosI;
  productosForm: FormGroup;
  public viewUser:any = this.afAuth.usuario;
  public categoriasList$ = this.productosSvc.categorias;
  public image:any;
  urlimg:string;
  public new_img:number = 0;
  imageSrc: any;
  public idSelect:string; public stateValue:number;

  constructor(private afAuth:AuthSvcService ,private fb: FormBuilder,private router:Router, private productosSvc:SvcProductosService) { 
    const navigation =  this.router.getCurrentNavigation();
    this.productos = navigation?.extras?.state?.value;
    this.image = this.productos.img;
    this.initForm();
  }

  activateProcess(state:string):void{
    // console.log("estado",state);
    // console.log('saved', this.productosForm.value);
    if(this.productosForm.valid){
      const productos = this.productosForm.value;
      const productoId = this.productos?.id || null;
      if(this.new_img == 0){
        this.productosSvc.activateProduct(productos,productoId,this.image,state);
        this.initForm();
        this.messageExito();
        this.router.navigate(['new']);
      }
    }
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
      this.urlimg = this.productos.img;
      /* console.log("datos",this.urlimg); */
    }
  }

  isValidField(field: string): string{
    const validatedField = this.productosForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void{
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion:['', [Validators.required]]
    })
  }

  onSave():void{
    var stateHtml = ((document.getElementById("state") as HTMLInputElement).value);
    // console.log("dato",num1);
    // console.log('saved', this.productosForm.value);
    if(this.productosForm.valid){
      const productos = this.productosForm.value;
      const productoId = this.productos?.id || null;
      if(this.new_img == 0){
        this.productosSvc.onSaveProductos(productos,productoId,this.image,stateHtml);
        this.messageExito();
        this.router.navigate(['new']);
      }else{
        this.productosSvc.preAddAndUpdatePost(productos,productoId,this.image,stateHtml);
        this.messageExito();
        this.router.navigate(['new']);
      }
    }
  }

  handleImage(event:any): void{
    this.new_img = 1;    
    this.image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }
    /* console.log('image: ',this.image); */
  }

  messageExito():void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cambios Guardados!',
      showConfirmButton: false,
      timer: 1000
    })
  }

}
