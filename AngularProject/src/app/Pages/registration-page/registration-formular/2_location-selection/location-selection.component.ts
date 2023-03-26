import { Component,Input, Output, EventEmitter} from '@angular/core';
import { faTruck, faHandHoldingHeart, faSadCry, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})
export class LocationSelectionComponent {

  @Input("type") type !: String; // Input variable for type to view either a error page if address is not confirmed from server or a just the selection 
  @Output() selectionChange = new EventEmitter<String>() // Output event emitter to emit if registration should be collected or is delivered on site
  @Output() back = new EventEmitter<void>() // Output event to signaling back button is pressed

  /* icons which gonna be inserted into html */
  public icons = {
    truck: faTruck,
    heart: faHandHoldingHeart,
    sad: faSadCry,
    backicon: faArrowLeft
  }

  /* onclick on pseudo button, set type for registration-page */
  setType(type : String){
    this.selectionChange.emit(type); // emit selected type to registration-page. type attribute comes from onclick listener
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal to registration-page
  }

}
