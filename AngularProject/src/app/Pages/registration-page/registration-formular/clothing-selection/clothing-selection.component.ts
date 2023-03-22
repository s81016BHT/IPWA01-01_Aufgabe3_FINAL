import { Component, Output, EventEmitter} from '@angular/core';
import { faArrowLeft, faShirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clothing-selection',
  templateUrl: './clothing-selection.component.html',
  styleUrls: ['./clothing-selection.component.css']
})
export class ClothingSelectionComponent {

  @Output() back = new EventEmitter<void>()
  @Output() clothesChange = new EventEmitter<any>();

  clothes = [{title: "Shirt", active: false}];

  icons = {
    shirt: faShirt,
    backicon: faArrowLeft
  }

  updateClothSelection(index : number){
    this.clothes[index].active = !this.clothes[index].active
  }

  setClothSelection(){
    if(this.clothes == null) return;

    let result = this.clothes.filter((cloth : any) => {
      return cloth.active === true
    }).map((cloth : any) => cloth.title);

    if(result.length > 0){
      this.clothesChange.emit(result);
    }
  }

  pageBack(){
    this.back.emit();
  }
}
