import { Component, Output, EventEmitter} from '@angular/core';
import { faArrowLeft, faEarthEurope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-area-selection',
  templateUrl: './area-selection.component.html',
  styleUrls: ['./area-selection.component.css']
})
export class AreaSelectionComponent {
  
  @Output() back = new EventEmitter<void>()
  @Output() areasChange = new EventEmitter<any>();

  areas = [{title: "Malu", active: false}];

  icons = {
    globe: faEarthEurope,
    backicon: faArrowLeft
  }

  updateAreaSelection(index : number){
    this.areas[index].active = !this.areas[index].active
  }

  setAreaSelection(){
    if(this.areas == null) return;

    let result = this.areas.filter((area : any) => {
      return area.active === true
    }).map((area : any) => area.title);

    if(result.length > 0){
      this.areasChange.emit(result);
    }
  }

  pageBack(){
    this.back.emit();
  }
}
