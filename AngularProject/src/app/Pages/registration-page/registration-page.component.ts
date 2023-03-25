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

  currentPage = <number>1;
  previousPages = <number[]>[];

  clothesList = [];
  areasList = [];
  registration = <Registration | null>null;

  type = <String | null>null;
  address = <Address | null>null;
  clothes = <String[] | null>null;
  areas = <String[] | null>null;

  constructor(private socket: SocketService) {
    this.socket.listen("addressValidation").subscribe((data: any) => {
      if (data.addressValid) this.nextPage(5);
      else this.nextPage(4);
    });

    this.socket.listen("registration").subscribe((data: any) => {
      if(data.registration != null){
        this.registration = data.registration;
        this.nextPage(7);
      }
    });

    this.socket.listen("getClothes").subscribe((data: any) => this.clothesList = data.clothes);
    this.socket.emit("getClothes", null);

    this.socket.listen("getAreas").subscribe((data: any) => this.areasList = data.areas);
    this.socket.emit("getAreas", null);
  }

  nextPage(page: number) {
    if(this.socket.connected){
      this.previousPages.push(this.currentPage);
      this.currentPage = page;
    }
  }

  previousPage() {
    this.currentPage = <number>this.previousPages.pop()
  }

  setType(selection: String) {
    this.type = selection;

    if (this.type == "Übergabe an der Geschäftsstelle") {
      this.address = null;
      this.nextPage(5)
    }
    else this.nextPage(3);
  }

  setAddress(address: Address) {
    this.address = address;

    if(this.socket.connected)
      this.socket.emit("addressValidation",<Address>this.address)
  }

  setClothes(clothes: String[]) {
    this.clothes = clothes
    this.nextPage(6);
  }

  setArea(areas: String[]) {
    this.areas = areas
    this.finishRegistration();
  }

  finishRegistration() {
    if (this.socket.connected && this.type != null && this.clothes != null && this.areas != null)
      this.socket.emit("newRegistration",<Registration>{
        type: this.type,
        address: this.address,
        clothes: this.clothes,
        areas: this.areas
      });
  }

  getRegistration(registrationId : any){
    if(this.socket.connected && registrationId != "")
      this.socket.emit("getRegistration",<RegistrationSearch>{
        registrationId: registrationId
      });
  }
}
