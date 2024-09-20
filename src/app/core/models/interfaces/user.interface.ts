import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IAddress, IAddressForm } from "./address.interface";

export interface IUser {
  name: string,
  birthdate: string,
  addresses: IAddress[] | null
}

export interface IUserForm {
  name: FormControl<string | null>;
  birthdate: FormControl<string | null>;
  addresses: FormArray<FormGroup<IAddressForm>>;
}
