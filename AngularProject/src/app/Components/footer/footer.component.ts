import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{
  routes = [
    { path:"/impressum", name:"Impressum",state:false},
    { path:"/datenschutz", name:"Datenschutzerklärung",state:false}
  ]

  constructor(private router : Router){
    router.events.subscribe((event : any) => {
      if(event instanceof NavigationEnd){
        this.routes.forEach(route => {
          if(event.url == route.path) route.state = true;
          else route.state = false;
        });
      }
    });
  }
}
