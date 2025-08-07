// src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-controller-news',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Não</button>
      <button mat-button [mat-dialog-close]="true">Sim</button>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 1.5em;
      font-weight: bold;
    }
    p {
      font-size: 1.1em;
    }
    div.mat-dialog-actions {
      justify-content: flex-end;
      gap: 10px;
    }
    button.mat-button {
      background-color: #A00030;
      color: white;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 5px;
      transition: background-color 0.2s;
    }
    button.mat-button:hover {
      background-color: #B00040;
    }
  `]
})
export class DeleteConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
