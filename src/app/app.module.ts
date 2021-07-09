import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { NewModule } from './pages/components/new/new.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { SendEmailComponent } from './pages/auth/send-email/send-email.component';
import { AuthSvcService } from './pages/auth/auth-svc.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FormsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NewModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ScrollingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthSvcService,CanAdminGuard,
    { provide: BUCKET, useValue: 'gs://carru-cell.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }