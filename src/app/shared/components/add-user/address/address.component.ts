import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IAddressForm } from '../../../../core/models/interfaces/address.interface';
import { ICountry } from '../../../../core/models/interfaces/country.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressComponent),
    multi: true
  }]
})
export class AddressComponent implements ControlValueAccessor {
  @Output() addCityEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() destroy$!: Subject<void>;
  @Input() countriesList$!: Observable<ICountry[]>;
  @Input() formGroup!: FormGroup<IAddressForm>;

  constructor(private cd: ChangeDetectorRef) {
    this.cd.markForCheck();
  }

  public onChange: any = () => { };
  public onTouched: any = () => { };

  writeValue(value: IAddressForm | any): void {
    if (value) {
      this.formGroup.setValue(value);
    } else {
      this.formGroup.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }
}
