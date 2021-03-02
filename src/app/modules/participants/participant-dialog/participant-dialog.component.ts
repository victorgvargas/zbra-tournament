import { Participant } from './../../../shared/models/participant.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-participant-dialog',
  templateUrl: './participant-dialog.component.html',
  styleUrls: ['./participant-dialog.component.scss'],
})
export class ParticipantDialogComponent implements OnInit {
  form = this._fb.group(
    {
      name: [this.data?.name],
      phoneNumber: [this.data?.phoneNumber],
      email: [this.data?.email, Validators.email],
    },
    { validators: [Validators.required] }
  );

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ParticipantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  compareObjects(obj1, obj2): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
