import { RoleValidator } from './helpers/roleValidator';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { userI } from 'src/app/shared/model/user.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthSvcService extends RoleValidator {
  public user$: Observable<userI>;
  public usuario:any = {};
  public dataUser:any = {};
  public data$:any ={};
  public correo:any = {};

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,private route:Router) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<userI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
      );
      
      /* this.dataUserCollection = afs.collection<userI>('users');
      this.getDataUser(); */
      
      this.afAuth.authState.subscribe(dataUser=>{
      if(!dataUser){
        return;
      }
      this.usuario.email = dataUser.email;
      this.usuario.uid = dataUser.uid;
    })
  }

 public redireccionarLogin(){
  this.afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      this.route.navigate(['/new']);
    }
  });
 }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async businessActivate(email: string, password: string): Promise<userI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<userI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      /* this.updateUserData(user); */
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<userI> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: userI) {
    const userRef: AngularFirestoreDocument<userI> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: userI = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'BUSINES',
    };

    return userRef.set(data, {merge: true});
  }

}
