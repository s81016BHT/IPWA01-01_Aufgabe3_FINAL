import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrollTop(){
    document.getElementsByTagName("body")[0].scrollTo(0,0);
  }
}
