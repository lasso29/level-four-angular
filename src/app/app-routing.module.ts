import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepinComponent } from './changepin/changepin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HistoryComponent } from './history/history.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent },
  {path:'changepin', component: ChangepinComponent },
  {path:'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
