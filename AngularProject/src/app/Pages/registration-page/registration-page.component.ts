import { Component } from '@angular/core';
import { Address, Registration, RegistrationSearch } from './types';
import { SocketService } from 'src/app/socket-service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  providers: [SocketService]
})
export class RegistrationPageComponent {

  currentPage = <number>1; // Current formular page
  previousPages = <number[]>[]; // List of previous formular pages

  clothesList = []; // List of all clothes, comes from Server
  areasList = []; // List of all areas, comes from Server
  registration = <Registration | null>null; // registration for overview, after search or new registration

  type = <String | null>null; // attribute to store type from location-selection formular part
  address = <Address | null>null; // attribute to address from address-form formular part
  clothes = <String[] | null>null; // attribute to store clothes from clothing-selection part
  areas = <String[] | null>null; // arrtibute to stor areas from area-selection part

  /* Constructor to initialise Websocket connection and initialising websocket events */
  constructor(private socket: SocketService) {
    this.socket.listen("addressValidation").subscribe((data: any) => {  // socket.io event for address validity check
      if (data.addressValid) this.nextPage(5); // if address valid, continue with clothing-selection
      else this.nextPage(4); // otherwise show error and provide new selection
    });

    this.socket.listen("registration").subscribe((data: any) => { // socket.io event for newRegistration and registrationsearch feedback
      this.registration = data.registration; // Store null or an actual registration object for the overview
      this.nextPage(7); // open the overview
    });

    this.socket.listen("getClothes").subscribe((data: any) => this.clothesList = data.clothes); // socket.io event for getting a list of all selectable clothes
    this.socket.emit("getClothes", null);

    this.socket.listen("getAreas").subscribe((data: any) => this.areasList = data.areas); // socket.io event for getting a list of all selectable areas
    this.socket.emit("getAreas", null);
  }

  /* Method for changing formular page forward by page number */
  nextPage(page: number) {
    if(this.socket.connected){ // only if Websocket connection is established
      this.previousPages.push(this.currentPage); // add current page to previousPages array
      this.currentPage = page; // set page selection to new page number
    }
  }

  /* Method for going back a page */
  previousPage() {
    this.currentPage = <number>this.previousPages.pop() // erase last element in previousPages and set currentPage to it.
  }

  /* Method to set the type by location-selection */
  setType(selection: String) {
    this.type = selection; // store passed type

    if (this.type == "Übergabe an der Geschäftsstelle") { 
      this.address = null; // set address null if collection is not selected
      this.nextPage(5) // continue with cloth selection
    }
    else this.nextPage(3); // continue with address form
  }

  /* Method to store the address by address-form */
  setAddress(address: Address) {
    this.address = address; // store passed address by address-form @Output event

    if(this.socket.connected)
      this.socket.emit("addressValidation",<Address>this.address) // Only if websocket connection is established, check passed address for validity
  }

  /* Method to store selected clothes by clothing-selection */
  setClothes(clothes: String[]) {
    this.clothes = clothes // store passed clothes by clothing-selection @Output event
    this.nextPage(6); // continue with area-selection
  }

  /* Method to store selected areas by area-selection */
  setArea(areas: String[]) {
    this.areas = areas // store passed areas by area-selection @Output event
    this.finishRegistration(); // finish the registration
  }
  
  /* Method to finish a reagistration */
  finishRegistration() {
    if (this.socket.connected && this.type != null && this.clothes != null && this.areas != null) // only if all needed fields filled and websocket connection is established
      this.socket.emit("newRegistration",<Registration>{ // Emit new registration object to socket.io newRegistration event
        type: this.type,
        address: this.address,
        clothes: this.clothes,
        areas: this.areas
      });
  }

  /* Method to search a registration by id from reagistration_search */
  getRegistration(registrationId : any){
    if(this.socket.connected) // Only if websocket connection is established
      this.socket.emit("getRegistration",<RegistrationSearch>{ // pass registrationId to socket.io getRegistration Event
        registrationId: registrationId
      });
  }
}
