import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CarInfoComponent } from './car-info/car-info.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserAuthGuard } from './user-auth.guard';
import { LoggedInGuard } from './logged-in.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[UserAuthGuard], component:HomeComponent},
  {path:'signup',canActivate:[LoggedInGuard], component:SignupComponent},
  {path:'login',canActivate:[LoggedInGuard] ,component:LoginComponent},
  {path:'contact-us',canActivate:[AuthGuard,UserAuthGuard], component:ContactUsComponent},
  {path:'car-info',canActivate:[AuthGuard,UserAuthGuard], component:CarInfoComponent},
  {path:'forgot-password',canActivate:[LoggedInGuard], component:ForgotPasswordComponent},
  {path:'event-details',canActivate:[AuthGuard,UserAuthGuard], component:EventDetailsComponent},
  {path:'profile',canActivate:[AuthGuard,UserAuthGuard], component:ProfileComponent},
  {path:'help',canActivate:[AuthGuard,UserAuthGuard], component:HelpPageComponent},
  {path:'change-password',canActivate:[AuthGuard], component:ChangePasswordComponent},
  {path:'dash-board',canActivate:[AuthGuard], component:DashboardComponent},
  {path:'**', redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
