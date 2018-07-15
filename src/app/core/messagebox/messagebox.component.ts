import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/**
 * Abstrakte Komponente für Modale-Dialoge, die den Benutzer über Ereignisse benachrichtigen sollen.
 */
@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  constructor(private  dialogRef: MatDialogRef<MessageboxComponent>, @Inject(MAT_DIALOG_DATA) public  data: any) {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
