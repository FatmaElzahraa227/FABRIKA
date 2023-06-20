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
// import { EditvehicleComponent } from './editvehicle/editvehicle.component';
// import { AddvehicleComponent } from './addvehicle/addvehicle.component';
// import { InboxComponent } from './inbox/inbox.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { MydashboardComponent } from './mydashboard/mydashboard.component';
// import { ReportsComponent } from './reports/reports.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { InboxComponent } from './inbox/inbox.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { SendEventReqComponent } from './send-event-req/send-event-req.component';


const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[UserAuthGuard], component:HomeComponent},
  {path:'signup',canActivate:[LoggedInGuard], component:SignupComponent},
  {path:'login',canActivate:[LoggedInGuard] ,component:LoginComponent},
  {path:'contact-us',canActivate:[AuthGuard,UserAuthGuard], component:ContactUsComponent},
  {path:'car-info',canActivate:[AuthGuard], component:CarInfoComponent},
  {path:'forgot-password',canActivate:[LoggedInGuard], component:ForgotPasswordComponent},
  {path:'event-details',canActivate:[AuthGuard], component:EventDetailsComponent},
  {path:'profile',canActivate:[AuthGuard,UserAuthGuard], component:ProfileComponent},
  {path:'help',canActivate:[AuthGuard,UserAuthGuard], component:HelpPageComponent},
  {path:'change-password',canActivate:[AuthGuard], component:ChangePasswordComponent},
  {path:'dash-board',canActivate:[AuthGuard,AdminAuthGuard], component:DashboardComponent},
  {path:'addvehicle',canActivate:[AuthGuard,AdminAuthGuard], component:AddVehicleComponent},
  {path:'editvehicle',canActivate:[AuthGuard,AdminAuthGuard], component:EditVehicleComponent},
  {path:'inbox',canActivate:[AuthGuard,AdminAuthGuard], component:InboxComponent},
  {path:'notifications',canActivate:[AuthGuard,AdminAuthGuard], component:NotificationsComponent},
  // {path:'reset-password', component:ResetPasswordComponent},
  {path:'reports',canActivate:[AuthGuard,AdminAuthGuard],component:ReportsComponent},
  {path:'mydashboard',canActivate:[AuthGuard,AdminAuthGuard], component:MydashboardComponent},
  {path:'sendEventReq',canActivate:[AuthGuard,UserAuthGuard], component:SendEventReqComponent},
  {path:'**', redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
