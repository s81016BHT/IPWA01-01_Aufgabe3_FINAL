import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';                // Routing Module for dynamic routing
import { BrowserModule } from '@angular/platform-browser';              // Browser Module for dynamic value insertion into the DOM
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';   // Font Awesome Library
import { FormsModule } from '@angular/forms';                           // Form Module for formular handling

/* Root module */
import { AppComponent } from './app.component';

/* Static components visible on all pages */
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

/* Lading Page of the webaplication */
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { CircularLoadingComponent } from './Pages/landing-page/circular-loading/circular-loading.component';

/* Imprint and privacy page of the webapplication */
import { ImprintPageComponent } from './Pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './Pages/privacy-page/privacy-page.component';

/* Registration Page */
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { StartscreenComponent } from './Pages/registration-page/registration-formular/1_startscreen/startscreen.component';
import { LocationSelectionComponent } from './Pages/registration-page/registration-formular/2_location-selection/location-selection.component';
import { AddressFormComponent } from './Pages/registration-page/registration-formular/3_address-form/address-form.component';
import { ClothingSelectionComponent } from './Pages/registration-page/registration-formular/4_clothing-selection/clothing-selection.component';
import { AreaSelectionComponent } from './Pages/registration-page/registration-formular/5_area-selection/area-selection.component';
import { RegistrationOverviewComponent } from './Pages/registration-page/registration-formular/6_registration-overview/registration-overview.component';
import { RegistrationSearchComponent } from './Pages/registration-page/registration-formular/7_registration-search/registration-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    CircularLoadingComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    RegistrationPageComponent,
    StartscreenComponent,
    LocationSelectionComponent,
    AddressFormComponent,
    ClothingSelectionComponent,
    AreaSelectionComponent,
    RegistrationOverviewComponent,
    RegistrationSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
