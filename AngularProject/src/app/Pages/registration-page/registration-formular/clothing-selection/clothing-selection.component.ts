import { Component, Input, Output, EventEmitter} from '@angular/core';
import { faArrowLeft, faShirt } from '@fortawesome/free-solid-svg-icons';
import { CheckListItem } from '../../types';

@Component({
  selector: 'app-clothing-selection',
  templateUrl: './clothing-selection.component.html',
  styleUrls: ['./clothing-selection.component.css']
})
export class ClothingSelectionComponent {

  @Output() back = new EventEmitter<void>() // Output event to signaling back button is pressed
  @Output() clothesChange = new EventEmitter<any>(); // Output event to signaling if clothing selection have changed on submit

  @Input("clothesList") clothList = <CheckListItem[]>[]; // List of all clohes the user can select from. Comes from registration-page component

  /* icons which gonna be inserted into html */
  icons = {
    shirt: faShirt,
    backicon: faArrowLeft
  }

  /* by clicking on an area button, change active state */
  updateClothSelection(index : number){
    this.clothList[index].active = !this.clothList[index].active // mark clothing as selected
  }

  /* by clicking on the continue button   */
  setClothSelection(){
    if(this.clothList == null) return; // if clothList is null, do nothing

    /* Filter selected clothes from clothList whichs active attribute is true and return list of the titles*/
    let result = this.clothList.filter((cloth : any) => {
      return cloth.active === true
    }).map((cloth : any) => cloth.title);

    if(result.length > 0){
      this.clothesChange.emit(result); // emit clothesChange event to registration-page with filtered result if at least one clothing type is selected!
    }
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal to registration-page
  }
}
