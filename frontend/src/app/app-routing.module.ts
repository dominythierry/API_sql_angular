// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
