import { Component, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-search',
  templateUrl: './registration-search.component.html',
  styleUrls: ['./registration-search.component.css']
})
export class RegistrationSearchComponent {
  @ViewChild("registrationIdref") registrationIdref !: ElementRef // Element reference to view Element with ID registrationIdref
                                                                  // other approach would be to give the element an ID and use document.getElementById()

  @Output() registrationIdChanged = new EventEmitter<any>(); // Output event to signaling, if registrationId has changed
  @Output() back = new EventEmitter<void>(); // Output event to signaling back button is pressed

  /* icons which gonna be inserted into html */
  public icons = {
    backicon: faArrowLeft
  }
  
  /* on click on search button emit registrationIdChanged to signaling that something was inserted */
  getRegistration(){
    let registrationid = this.registrationIdref.nativeElement.value; // get inserted value by ElementRef
                                                                     // other approach would be to use document.getElementById().value

    if(registrationid != "") this.registrationIdChanged.emit(registrationid); // emit registrationIdChanged event to registration-page component, if input field is not empty!
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal.
  }
}
