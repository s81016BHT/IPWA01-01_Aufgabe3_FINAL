import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ImprintPageComponent } from './Pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './Pages/privacy-page/privacy-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CircularLoadingComponent } from './Components/circular-loading/circular-loading.component';
import { StartscreenComponent } from './Pages/registration-page/registration-formular/startscreen/startscreen.component';
import { LocationSelectionComponent } from './Pages/registration-page/registration-formular/location-selection/location-selection.component';
import { AddressFormComponent } from './Pages/registration-page/registration-formular/address-form/address-form.component';
import { ClothingSelectionComponent } from './Pages/registration-page/registration-formular/clothing-selection/clothing-selection.component';
import { AreaSelectionComponent } from './Pages/registration-page/registration-formular/area-selection/area-selection.component';
import { RegistrationOverviewComponent } from './Pages/registration-page/registration-formular/registration-overview/registration-overview.component';
import { RegistrationSearchComponent } from './Pages/registration-page/registration-formular/registration-search/registration-search.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
