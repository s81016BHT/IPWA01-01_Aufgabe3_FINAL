import { Component, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-search',
  templateUrl: './registration-search.component.html',
  styleUrls: ['./registration-search.component.css']
})
export class RegistrationSearchComponent {
  @ViewChild("registrationIdref") registrationIdref !: ElementRef

  @Output() registrationIdChanged = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();

  public icons = {
    backicon: faArrowLeft
  }
  
  getRegistration(){
    let registrationid = this.registrationIdref.nativeElement.value;
    if(registrationid != "") this.registrationIdChanged.emit(registrationid);
  }

  pageBack(){
    this.back.emit();
  }
}
