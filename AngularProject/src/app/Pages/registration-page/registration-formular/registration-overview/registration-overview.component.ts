import { Component, Input, Output, EventEmitter} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-overview',
  templateUrl: './registration-overview.component.html',
  styleUrls: ['./registration-overview.component.css']
})
export class RegistrationOverviewComponent {
  @Input("registrationData") registrationData : any
  @Output() back = new EventEmitter<void>()

  public icons = {
    backicon: faArrowLeft
  }

  pageBack(){
    this.back.emit();
  }
}
