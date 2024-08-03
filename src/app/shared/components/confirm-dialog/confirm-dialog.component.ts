import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(private matDialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  close(value: boolean): void {
    this.matDialogRef.close(value);
  }
}
