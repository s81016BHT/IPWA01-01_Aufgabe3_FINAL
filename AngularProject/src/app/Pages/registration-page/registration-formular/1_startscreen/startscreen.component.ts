import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent {
  @Output() register = new EventEmitter<void>(); // Output event emitter to registration-page component to start a registration
  @Output() search = new EventEmitter<void>(); // Output event emitter to registration-page component to search a registration

  startRegistration(){
    this.register.emit(); // emit registration start to registrati-page component
  }

  searchRegistration(){
    this.search.emit(); // emit search start to registrati-page component
  }
}
