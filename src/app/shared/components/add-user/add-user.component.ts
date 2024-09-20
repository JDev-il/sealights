import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAddressForm } from '../../../core/models/interfaces/address.interface';
import { ICountry } from '../../../core/models/interfaces/country.interface';
import { DataService } from '../../services/data.service';
import { DialogComponent } from '../reusable/dialog/dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent {
  public userForm!: FormGroup;
  public formAddress!: FormGroup<IAddressForm>;
  public countriesList$!: Observable<ICountry[]>;
  public isCountry!: boolean;

  constructor(private dataService: DataService, private fb: FormBuilder, private cd: ChangeDetectorRef, private dialog: MatDialog) {
    this.userForm = this.dataService.getUserForm();
    this.countriesList$ = this.dataService.countriesList$;
  }

  addCityDialog() {
    const country = this.getCountry(this.addresses.length - 1) as ICountry;
    this.dialog.open(DialogComponent, {
      data: {
        name: country && country.name ? `Add city to ${country.name}` : 'Please select a country first',
        countryId: country.id,
        isEmpty: !!country.name
      }
    })
  }

  get addresses(): FormArray<FormGroup<IAddressForm>> {
    return this.userForm.get('addresses') as FormArray<FormGroup<IAddressForm>>;
  }

  public getCountry(addressIndex: number): ICountry | unknown {
    return this.addresses.at(addressIndex).get('country')?.value;

  }

  public getCities(addressIndex: number): FormArray {
    const control = this.addresses.at(addressIndex).get('city');
    if (control instanceof FormArray) {
      return control;
    }
    return this.fb.array([]);
  }

  public addCity(addressIndex: number): void {
    const cities = this.getCities(addressIndex);
    cities.push(this.fb.control('', Validators.required));
  }

  public removeCity(addressIndex: number, cityIndex: number): void {
    const cities = this.getCities(addressIndex);
    cities.removeAt(cityIndex);
  }

  public addAddress(): void {
    this.dataService.addAddress();
  }

  public removeAddress(index: number): void {
    this.dataService.removeAddress(index);
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.dataService.submitUser();
    }
  }
}
