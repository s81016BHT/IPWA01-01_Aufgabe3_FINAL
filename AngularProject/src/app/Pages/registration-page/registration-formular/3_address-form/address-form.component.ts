import { Component, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms'
import { faTruck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Address } from '../../types';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent {
  @Input("address") address !: Address | null;            // Input variable for an address
  @Output() back = new EventEmitter<void>()               // Output Event to signaling back button was pressed
  @Output() addressChange = new EventEmitter<Address>();  // Output Event to signalling form with address was submitted

  @ViewChild("adressForm") addressForm !: NgForm // Formular reference to set adress data, if address is not null

  /* List of icons which are inserted into address-form.component.html */
  icons = {
    truck: faTruck,  
    backicon: faArrowLeft
  }

  ngAfterViewInit(){
    
    /* Fill adressForm fields with address data, if not null */
    setTimeout(() => {
      if(this.address != null)
        this.addressForm.setValue(this.address)
    });

  }

  /* onclick on back button emits back signal to registration-page component */
  pageBack(){
    this.back.emit(); // emit back signal
  }

  /* addressform submit emits addressChange signal to registration-page component */
  setAddress(addressForm : NgForm){
    if(addressForm.invalid) return;

    // Form address object based on addressForm fields
    this.address = {
      name: addressForm.value.name,
      surname: addressForm.value.surname,
      street: addressForm.value.street,
      number: addressForm.value.number,
      zipcode: addressForm.value.zipcode,
      location: addressForm.value.location
    }

    this.addressChange.emit(this.address); // emit addressChange signal
  }

}
