import { Component, Input, Output, EventEmitter} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Registration } from '../../types';

@Component({
  selector: 'app-registration-overview',
  templateUrl: './registration-overview.component.html',
  styleUrls: ['./registration-overview.component.css']
})
export class RegistrationOverviewComponent {
  @Input("registrationData") registrationData !: Registration | null // Input variable for registrationdata which should be shown
  @Output() back = new EventEmitter<void>() // Output event to signaling back button is pressed

  /* icons which gonna be inserted into html */
  public icons = {
    backicon: faArrowLeft
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit selected type to registration-page. type attribute comes from onclick listener
  }
}
