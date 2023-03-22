import { Component, OnInit } from '@angular/core';
import { texts } from './pagetexts';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  public texts = texts

  ngOnInit(): void {
  }

}
