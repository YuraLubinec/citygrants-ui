import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogAdminUserPageComponent} from "../dialog-admin-user-page/dialog-admin-user-page.component";

@Component({
  selector: 'app-dialog-confirm-delete-page',
  templateUrl: './dialog-confirm-delete-page.component.html',
  styleUrls: ['./dialog-confirm-delete-page.component.css']
})
export class DialogConfirmDeletePageComponent implements OnInit {

  constructor(public dialogConfirm: MatDialogRef<DialogConfirmDeletePageComponent>) { }

  ngOnInit() {
  }

  cancelRemove(): void {
    this.dialogConfirm.close('cancel');
  }

  confirmRemove(): void {
    this.dialogConfirm.close('confirm');
  }

}
