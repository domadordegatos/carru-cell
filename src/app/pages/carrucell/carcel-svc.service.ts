import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { categorieI } from 'src/app/shared/model/categori.interface';

@Injectable({
  providedIn: 'root'
})
export class CarcelSvcService {
  private categoriesViewCollection: AngularFirestoreCollection<categorieI>;

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
}
