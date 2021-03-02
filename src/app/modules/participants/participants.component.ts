import { Participant } from './../../shared/models/participant.model';
import { StorageService } from './../../shared/services/storage.service';
import { ParticipantDialogComponent } from './participant-dialog/participant-dialog.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  tournamentTitle = 'Meu Torneio';
  displayedColumns = ['name', 'phoneNumber', 'email', 'actions'];
  dataSource: Participant[] = [];
  private _dialogData: Participant;
  private _destroy$ = new Subject<boolean>();

  @ViewChild('table') table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._storageService
      .buildDB()
      .pipe(
        switchMap(() => this._storageService.getAllData()),
        map(
          (request) =>
            (request.onsuccess = () => {
              this.dataSource = [...request.result];
              this.table.renderRows();
            })
        ),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  openCreateDialog(type: string, dialogData?: Participant): void {
    this._dialogData = dialogData;
    const dialogRef = this.dialog.open(ParticipantDialogComponent, {
      width: '300px',
      data: {
        name: dialogData?.name,
        phoneNumber: dialogData?.phoneNumber,
        email: dialogData?.email,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((participant) => !!participant),
        switchMap((participant: Participant) => {
          if (type === 'create') {
            this.dataSource.push(participant);
            this.table.renderRows();
            return this._storageService.addData(participant);
          }
          if (type === 'edit') {
            this.dataSource[
              this.dataSource.indexOf(this._dialogData)
            ] = participant;
            this.table.renderRows();
            return this._storageService.alterData(
              participant.phoneNumber,
              participant
            );
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  openDeleteDialog(participant: Participant): void {
    const result = window.confirm(
      'Atenção! Você está prestes a deletar um registro da tabela!'
    );
    if (result) {
      this.dataSource.splice(this.dataSource.indexOf(participant), 1);
      this.table.renderRows();
      this._storageService
        .removeData(participant.phoneNumber)
        .pipe(takeUntil(this._destroy$))
        .subscribe();
    }
  }
}
