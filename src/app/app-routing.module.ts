import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';
import { BacSiComponent } from './bac-si/bac-si.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  {path: '', component: GioiThieuComponent, canActivate: [AuthGuard]},
  {path: 'services', component: DichVuComponent, canActivate: [AuthGuard]},
  {path: 'doctors', component: BacSiComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
