import { Component,Input , Output, EventEmitter} from '@angular/core';
import { faArrowLeft, faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import { CheckListItem } from '../../types';

@Component({
  selector: 'app-area-selection',
  templateUrl: './area-selection.component.html',
  styleUrls: ['./area-selection.component.css']
})
export class AreaSelectionComponent {
  
  @Output() back = new EventEmitter<void>() // Output event to signaling back button is pressed
  @Output() areasChange = new EventEmitter<String[]>(); // Output event to signaling if areas have changed on submit

  @Input("areasList") areasList = <CheckListItem[]>[]; // List of all areas the user can select from. Comes from registration-page component

  /* icons which gonna be inserted into html */
  icons = {
    globe: faEarthEurope,
    backicon: faArrowLeft
  }

  /* by clicking on an area button, change active state */
  updateAreaSelection(index : number){
    this.areasList.forEach((area : CheckListItem) => area.active = false); // Clear all selections
    this.areasList[index].active = !this.areasList[index].active // mark a single area
  }

  /* by clicking on the continue button   */
  setAreaSelection(){
    if(this.areasList == null) return; // if areas is empty, do nothing

    /* Filter selected areas from areasList whichs active attribute is true and return list of the titles*/
    let result = this.areasList.filter((area : any) => {
      return area.active === true
    }).map((area : any) => area.title);

    if(result.length > 0) this.areasChange.emit(result); // emit areasChange event to registration-page with filtered result if at least one area is selected!
  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal to registration-page
  }
}
