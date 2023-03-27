import { Component,Output, EventEmitter} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-search',
  templateUrl: './registration-search.component.html',
  styleUrls: ['./registration-search.component.css']
})
export class RegistrationSearchComponent {
  @Output() registrationIdChanged = new EventEmitter<String>(); // Output event to signaling, if registrationId has changed
  @Output() back = new EventEmitter<void>(); // Output event to signaling back button is pressed

  /* icons which gonna be inserted into html */
  public icons = {
    backicon: faArrowLeft
  }
  
  /* on click on search button emit registrationIdChanged to signaling that something was inserted */
  getRegistration(){
    let errorMsg = document.getElementById("errorMsg") as HTMLParagraphElement;
    let input = document.getElementById("registrationId") as HTMLInputElement; // Get input field element by id

    if(input != null){
      let registrationid = input.value // Angular approach would be to use ElementRef View Container
                                       

      if(registrationid != "" && registrationid.length == 13) this.registrationIdChanged.emit(registrationid); // emit registrationIdChanged event to registration-page component, if input field is not empty!
      else if(errorMsg != null) errorMsg.innerHTML = "Bitte eine gültige ID angeben!"; // show error message in errorMsg if ID to short or empty!
    }
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal.
  }
}
