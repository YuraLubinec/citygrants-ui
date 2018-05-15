import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-confirm-delete-page',
  templateUrl: './dialog-confirm-delete-page.component.html',
  styleUrls: ['./dialog-confirm-delete-page.component.css']
})
export class DialogConfirmDeletePageComponent implements OnInit {

  constructor(public dialogConfirm: MatDialogRef<DialogConfirmDeletePageComponent>) {
  }

  ngOnInit() {
  }

  cancelRemove(): void {
    this.dialogConfirm.close('cancel');
  }

  confirmRemove(): void {
    this.dialogConfirm.close('confirm');
  }

}
