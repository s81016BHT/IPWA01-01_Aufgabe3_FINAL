import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ImprintPageComponent } from './Pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './Pages/privacy-page/privacy-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CircularLoadingComponent } from './Components/circular-loading/circular-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    RegistrationPageComponent,
    HeaderComponent,
    FooterComponent,
    CircularLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
