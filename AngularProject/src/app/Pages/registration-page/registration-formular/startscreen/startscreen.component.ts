import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent {
  @Output() register = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();

  startRegistration(){
    this.register.emit();
  }

  searchRegistration(){
    this.search.emit();
  }
}
