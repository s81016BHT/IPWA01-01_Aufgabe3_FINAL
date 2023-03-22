import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ImprintPageComponent } from './Pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './Pages/privacy-page/privacy-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    RegistrationPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
