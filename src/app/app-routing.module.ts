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

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login' ,component:LoginComponent},
  {path:'contact-us',canActivate:[AuthGuard], component:ContactUsComponent},
  {path:'car-info',canActivate:[AuthGuard], component:CarInfoComponent},
  {path:'forgot-password',canActivate:[AuthGuard], component:ForgotPasswordComponent},
  {path:'event-details',canActivate:[AuthGuard], component:EventDetailsComponent},
  {path:'profile',canActivate:[AuthGuard], component:ProfileComponent},
  {path:'help',canActivate:[AuthGuard], component:HelpPageComponent},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
