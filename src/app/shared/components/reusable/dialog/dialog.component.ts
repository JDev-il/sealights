import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  dialogForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: Document,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dataService: DataService
  ) {
    this.dialogForm = this.dataService.dialogInput();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addCity(): void {
    const value = this.dialogForm.get('city')?.value;
    if (value) {
      this.dataService.addNewCity(this.dialogForm, this.data.countryId);
    }
    this.closeDialog();
  }

}
