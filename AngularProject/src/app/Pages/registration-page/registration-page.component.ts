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

  type = <String | null>null;
  address = <Address | null>null;
  clothes = <String[] | null>null;
  areas = <String[] | null>null;

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

  setType(selection : String){
    this.type = selection;

    if(this.type == "Übergabe an der Geschäftsstelle"){
      this.address = null;
      this.nextPage(5)
    }
    else this.nextPage(3);
  }

  setAddress(address : Address){
    this.address = address

    // check zipcode! this.nextPage(4)
    this.nextPage(5);
  }

  setClothes(clothes : String[]){
    this.clothes = clothes

    this.nextPage(6);
  }

  setArea(areas : String[]){
    this.areas = areas
    this.finishRegistration();
  }

  finishRegistration(){
    console.log(this.type,this.address,this.clothes,this.areas)

    // Send registration to Server!

  }

}
