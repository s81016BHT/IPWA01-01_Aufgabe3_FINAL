import { Component, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms'
import { faTruck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Address } from '../../types';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent {
  @Input("address") address !: Address | null;
  @Output() back = new EventEmitter<void>()
  @Output() addressChange = new EventEmitter<Address>();

  @ViewChild("adressForm") addressForm !: NgForm

  icons = {
    truck: faTruck,
    backicon: faArrowLeft
  }

  ngAfterViewInit(){
    setTimeout(() => {
      if(this.address != null)
        this.addressForm.setValue(this.address)
    });
  }

  pageBack(){
    this.back.emit();
  }

  setAddress(addressForm : NgForm){
    if(addressForm.invalid) return;

    this.address = {
      name: addressForm.value.name,
      surname: addressForm.value.surname,
      street: addressForm.value.street,
      number: addressForm.value.number,
      zipcode: addressForm.value.zipcode,
      location: addressForm.value.location
    }

    this.addressChange.emit(this.address);
  }

}
