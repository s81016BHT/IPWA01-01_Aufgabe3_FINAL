import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintPageComponent } from './Pages/imprint-page/imprint-page.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { PrivacyPageComponent } from './Pages/privacy-page/privacy-page.component';
import { RegistrationPageComponent } from './Pages/registration-page/registration-page.component';

const routes: Routes = [
  {path:"", component:LandingPageComponent},
  {path: "anmeldung", component: RegistrationPageComponent},
  {path: "impressum", component: ImprintPageComponent},
  {path: "datenschutz", component: PrivacyPageComponent},
  {path: "**", redirectTo: "/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
