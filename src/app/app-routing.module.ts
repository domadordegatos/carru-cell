import { CanAdminGuard } from './pages/auth/guard/can-admin.guard';
import { SendEmailComponent } from './pages/auth/send-email/send-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: '', redirectTo:'/new', pathMatch: 'full' }, 
{ path: 'new', loadChildren: () => import('./pages/components/new/new.module').then(m => m.NewModule), canActivate: [CanAdminGuard]},
{ path: 'edit', loadChildren: () => import('./pages/components/edit/edit.module').then(m => m.EditModule), canActivate: [CanAdminGuard]},
{ path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
{ path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule), canActivate: [CanAdminGuard]},
{ path: 'verification-email', component:SendEmailComponent },
{ path: 'forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
{ path: 'carru-cell', loadChildren: () => import('./pages/carrucell/carrucell.module').then(m => m.CarrucellModule) },
{ path: 'categories', loadChildren: () => import('./pages/components/categories/categories.module').then(m => m.CategoriesModule), canActivate: [CanAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }