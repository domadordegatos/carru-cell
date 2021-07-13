import { categorieI } from './../../shared/model/categori.interface';
import { ProductosI } from './../../shared/model/productos.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { finalize, map } from 'rxjs/operators';
import { imagenI } from 'src/app/shared/model/imagen.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthSvcService } from '../auth/auth-svc.service';

@Injectable({
  providedIn: 'root'
})
export class SvcProductosService {
  productos: Observable<ProductosI[]>
  categorias: Observable<categorieI[]>
  private filePath: any;
  private downloadURL: Observable<string>
  private productosCollection: AngularFirestoreCollection<ProductosI>;
  private categoriesCollection: AngularFirestoreCollection<categorieI>;
  public viewUser:any = this.afAuth.usuario;

  constructor(public afAuth:AuthSvcService ,private readonly afs: AngularFirestore, private storage: AngularFireStorage) {
    /* this.productosCollection = afs.collection<ProductosI>('productos', ref=> ref.orderBy('date','desc')); */
    this.productosCollection = afs.collection<ProductosI>('productos', p=> p.where('email','==',this.viewUser.email));
    this.categoriesCollection = afs.collection<categorieI>('categorias', p=> p.where('email','==',this.viewUser.email));
    this.getProductos();
    this.getCategories();
   }

   onDeleteProductos(empId:string):Promise<void>{
    return new Promise(async (resolve,reject) => {
      try{
        const result = await this.productosCollection.doc(empId).delete();
        resolve(result);
      }catch(err){
        reject(err.message)
      }
    })
 }

 onDeleteCategorie(itemId:string):Promise<void>{
  return new Promise(async (resolve,reject) => {
    try{
      const result = await this.categoriesCollection.doc(itemId).delete();
      resolve(result);
    }catch(err){
      reject(err.message)
    }
  })
 }

 public saveCategorie(categoria:categorieI,catId:string){
  return new Promise( async (resolve, reject) => {
    try{
      const date = new Date().getTime();
      const id = catId || this.afs.createId();
      const email = this.viewUser.email;
      const data = {id,date,email, ...categoria};
      const result = await this.categoriesCollection.doc(id).set(data);
      resolve(result);  
    }catch(err){
       reject(err.message);
    }
  })
 }

 public preAddAndUpdatePost(producto:ProductosI,empId:string,image: imagenI):void{
  this.uploadImage(producto,empId,image);
  
}

 onSaveProductos(producto:ProductosI,empId:string,img:string):Promise<void>{
   return new Promise( async (resolve, reject) => {
     try{
       const date = new Date().getTime();
       const email = this.viewUser.email;
       const id = empId || this.afs.createId();
       const data = {id,img,date,email, ...producto};
       const result = await this.productosCollection.doc(id).set(data);
       resolve(result);  
     }catch(err){
        reject(err.message);
     }
   })
 }

 private getProductos():void{
    this.productos = this.productosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a=> a.payload.doc.data() as ProductosI))
    )
 }
 
 public getCategories():void{
  this.categorias = this.categoriesCollection.snapshotChanges().pipe(
    map(actions => actions.map(a=> a.payload.doc.data() as categorieI))
  )
}



 private uploadImage(dataSave: ProductosI,empId:string,img: imagenI){
  this.filePath = `images_restaurant/${img.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, img);
  task.snapshotChanges()
  .pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImage =>{
        this.downloadURL = urlImage;
        /* console.log(urlImage);
        console.log('post', dataSave); */
        this.onSaveProductos(dataSave,empId,urlImage);
      })
    })
  ).subscribe();
}
}
