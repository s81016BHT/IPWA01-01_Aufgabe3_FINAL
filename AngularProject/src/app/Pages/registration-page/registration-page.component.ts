import { Component, OnInit } from '@angular/core';
import { Address, Registration } from './types';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  currentPage = <number>1;
  previousPages = <number[]>[];

  selection !: String
  address !: Address

  constructor() { }

  ngOnInit(): void {
  }

  nextPage(page : number){
    this.previousPages.push(this.currentPage);
    this.currentPage = page;
  }

  previousPage(){
    this.currentPage = <number>this.previousPages.pop()
  }

  setSelection(selection : String){
    this.selection = selection;

    if(this.selection == "Übergabe an der Geschäftsstelle") this.nextPage(5)
    else this.nextPage(5);
  }

  setAddress(address : Address){
    if(address.name == "" || address.surname == "" || address.street == "" || address.number == "" || address.zipcode == "") this.address == null;
    else this.address == address

    this.nextPage(4);
  }

}
