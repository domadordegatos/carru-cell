import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { SendEmailComponent } from './pages/auth/send-email/send-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContacComponent } from './pages/components/contac/contac.component';

const routes: Routes = [
{ path: '', redirectTo:'/new', pathMatch: 'full' }, 
{ path: 'new', loadChildren: () => import('./pages/components/new/new.module').then(m => m.NewModule), canActivate: [CanAdminGuard]},
{ path: 'edit', loadChildren: () => import('./pages/components/edit/edit.module').then(m => m.EditModule), canActivate: [CanAdminGuard]},
{ path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
{ path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule), canActivate: [CanAdminGuard]},
{ path: 'verification-email', component:SendEmailComponent },
{ path: 'forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
{ path: 'categories', loadChildren: () => import('./pages/components/categories/categories.module').then(m => m.CategoriesModule), canActivate: [CanAdminGuard]},
{ path: 'carru-cell/:id', loadChildren: () => import('./pages/carrucell/carrucell/carrucell.module').then(m => m.CarrucellModule) },
{ path: 'contact-me', component:ContacComponent},
{ path: 'my-menu/:id/:cat', loadChildren: () => import('./pages/carrucell/mymenu/mymenu.module').then(m => m.MymenuModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }