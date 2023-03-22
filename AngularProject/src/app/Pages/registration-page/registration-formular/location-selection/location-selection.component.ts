import { Component,Input, Output, EventEmitter} from '@angular/core';
import { faTruck, faHandHoldingHeart, faSadCry, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})
export class LocationSelectionComponent {

  @Input("type") type !: String;
  @Output() selectionChange = new EventEmitter<String>()
  @Output() back = new EventEmitter<void>()

  public icons = {
    truck: faTruck,
    heart: faHandHoldingHeart,
    sad: faSadCry,
    backicon: faArrowLeft
  }

  setType(type : String){
    this.selectionChange.emit(type);
  }

  pageBack(){
    this.back.emit();
  }

}
