import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empty-list-dialog',
  template: `
    <h2 mat-dialog-title>There are no Courses</h2>
    <mat-dialog-content>
      <p>Please Add Courses</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
    <button mat-button (click)="closeDialog()" routerLink="/home">Add Courses</button>
   
    </mat-dialog-actions>
  `,
})
export class EmptyListDialogComponent {
  constructor(public dialogRef: MatDialogRef<EmptyListDialogComponent>) { }
  closeDialog() {
    this.dialogRef.close();
  }
}
