import { Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { faTruck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Address } from '../../types';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  @Output() back = new EventEmitter<void>()
  @Output() addressChange = new EventEmitter<Address>();

  @ViewChild("nameref") nameref !: ElementRef
  @ViewChild("surnameref") surnameref !: ElementRef
  @ViewChild("streetref") streetref !: ElementRef
  @ViewChild("numberref") numberref !: ElementRef
  @ViewChild("zipcoderef") zipcoderef !: ElementRef
  @ViewChild("locationref") locationref !: ElementRef

  icons = {
    truck: faTruck,
    backicon: faArrowLeft
  }

  address !: Address;

  pageBack(){
    this.back.emit();
  }

  setAddress(){
    this.address = {
      name: this.nameref.nativeElement.value,
      surname: this.surnameref.nativeElement.value,
      street: this.streetref.nativeElement.value,
      number: this.numberref.nativeElement.value,
      zipcode: this.zipcoderef.nativeElement.value,
      location: this.locationref.nativeElement.value
    }

    this.addressChange.emit(this.address);
  }

}
