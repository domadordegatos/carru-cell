import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { categorieI } from 'src/app/shared/model/categori.interface';
import { ProductosI } from 'src/app/shared/model/productos.interface';
import { userI } from 'src/app/shared/model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CarcelSvcService {
  private categoriesViewCollection: AngularFirestoreCollection<categorieI>;
  private dataViewCollection: AngularFirestoreCollection<userI>;

  constructor(private readonly afs: AngularFirestore) { }

  

  public getCategoriesView(email:string): Observable<categorieI[]>{
          
    this.categoriesViewCollection = this.afs.collection<categorieI>('categorias', p=> p.where('email','==',email));
  
    return this.categoriesViewCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as categorieI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getInformationCategorieView(email:string,cateogia:string): Observable<ProductosI[]>{
          
    this.categoriesViewCollection = this.afs.collection<ProductosI>('productos', p=> p.where('email','==',email).where('categoria','==',cateogia));
  
    return this.categoriesViewCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ProductosI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getDataView(email:string): Observable<userI[]>{
          
    this.dataViewCollection = this.afs.collection<userI>('users', p=> p.where('email','==',email));
  
    return this.dataViewCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as userI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
