import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAddressForm } from '../../core/models/interfaces/address.interface';
import { ICountry } from '../../core/models/interfaces/country.interface';
import { ApiService } from '../../core/services/api.service';
import { IUser, IUserForm } from './../../core/models/interfaces/user.interface';
import { FormsService } from './forms.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends FormsService {

  public displayedColumns: string[] = ['id', 'name', 'birthdate', 'addressesCount'];

  constructor(fb: FormBuilder, private apiService: ApiService) {
    super(fb);
  }

  public dialogInput(): FormGroup {
    return this._dialogForm;
  }

  public addNewCity(dialogForm: FormGroup, countryId: number): void {
    const cityValue = dialogForm.get('city')?.value;
    this.apiService.addNewCity(cityValue, countryId);
  }

  public usersList$(): Observable<IUser[]> {
    return this.apiService.users$;
  }

  public get countriesList$(): Observable<ICountry[]> {
    return this.apiService.countries$;
  }

  public get getAddress(): FormArray<FormGroup<IAddressForm>> {
    return this.addresses;
  }

  public getUserForm(): FormGroup<IUserForm> {
    return this.userForm;
  }

  public addAddress(): void {
    this._addAddress();
  }

  public removeAddress(index: number): void {
    this._removeAddress(index);
  }

  public submitUser(): void {
    if (this.userForm.valid) {
      const userForm = this.userForm.value as IUser;
      this.apiService.addUser(userForm)
    }
  }

}
