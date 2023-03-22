import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  currentPage = <number>1;
  previousPages = <number[]>[]

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

}
