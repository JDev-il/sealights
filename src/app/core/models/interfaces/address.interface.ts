import { FormControl } from "@angular/forms";

export interface IAddress {
  name: string,
  countryId: number;
  cityId: number;
  street: string;
}

export interface IAddressForm {
  name: FormControl<string | null>;
  country: FormControl<number | null>;
  city: FormControl<number | null>;
  street: FormControl<string | null>;
}

