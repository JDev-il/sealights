import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddressForm } from '../../core/models/interfaces/address.interface';
import { IUserForm } from './../../core/models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class FormsService {
  protected formAddressInit!: FormArray<FormGroup<IAddressForm>>;
  protected userForm: FormGroup<IUserForm> = this.fb.group<IUserForm>({
    name: this.fb.control('', Validators.required),
    birthdate: this.fb.control('', Validators.required),
    addresses: this.fb.array<FormGroup<IAddressForm>>([], Validators.required),
  });

  constructor(private fb: FormBuilder) { }

  protected get _dialogForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control('')
    })
  }

  protected get addresses(): FormArray<FormGroup<IAddressForm>> {
    return this.userForm.get('addresses') as FormArray<FormGroup<IAddressForm>>;
  }

  protected _addAddress(): void {
    const formAddress: FormGroup<IAddressForm> = this._addressInit();
    this.addresses.push(formAddress);
  }

  protected _removeAddress(index: number): void {
    if (this.addresses.length > 0) {
      this.addresses.removeAt(index);  // Remove the address at the given index
    }
  }

  private _addressInit(): FormGroup<IAddressForm> {
    return this.fb.group<IAddressForm>({
      name: this.fb.control('', Validators.required),
      country: this.fb.control(null, Validators.required),
      city: this.fb.control(null, Validators.required),
      street: this.fb.control('', Validators.required),
    });
  }
}
