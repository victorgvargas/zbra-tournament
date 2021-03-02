import { ParticipantDialogComponent } from './participant-dialog/participant-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ParticipantsComponent, ParticipantDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ParticipantsRoutingModule,
    FlexLayoutModule,
    AngularFormsInputMasksModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
  ],
  entryComponents: [ParticipantDialogComponent],
})
export class ParticipantsModule {}
