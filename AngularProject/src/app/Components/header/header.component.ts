import { Component } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  
  closed = faBars;
  open = faXmark;
  navstate = false;

  routes = [
    { path:"/", name:"Startseite",state:true},
    { path:"/anmeldung", name:"Spendenanmeldung",state:false}
  ]

  constructor(private router : Router){
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.routes.forEach(route => {
          if(event.url == route.path) route.state = true;
          else route.state = false;
        });
      }
    });
  }

  toggleNav(){
    this.navstate = !this.navstate 
  }

  closeNav(){
    this.navstate = false
  }
}
