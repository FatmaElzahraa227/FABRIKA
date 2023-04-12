import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    LoginComponent,
    ContactUsComponent,
    HomeComponent,
    FooterComponent,
    CarInfoComponent,
    ForgotPasswordComponent,
    EventDetailsComponent,
    ProfileComponent,
    HelpPageComponent,
    PreloaderComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
