import { Tournament } from './../../shared/models/tournament.model';
import { map, switchMap } from 'rxjs/operators';
import { StorageService } from './../../shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import 'jquery';

declare const $: JQuery;
declare global {
  interface JQuery {
    (any): JQuery;
    bracket(options: any): JQuery;
  }
}

@Component({
  selector: 'app-tournament-keys',
  templateUrl: './tournament-keys.component.html',
  styleUrls: ['./tournament-keys.component.scss'],
})
export class TournamentKeysComponent implements OnInit {
  participantNames: string[] = [];
  tournamentData: Tournament;

  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    this._storageService
      .buildDB()
      .pipe(
        switchMap(() => this._storageService.getAllData()),
        map(
          (request) =>
            (request.onsuccess = () => {
              this.participantNames = [
                ...request.result.map((participant) => participant.name),
              ];
              this.tournamentData = {
                teams: this.participantNames.map((participant, index) => {
                  if (index % 2 !== 0) {
                    return [participant, this.participantNames[index - 1]];
                  }
                }).filter(value => !!value),
              };
              (<any>$('#minimal')).bracket({
                init: this.tournamentData
              });
            })
        )
      )
      .subscribe();
  }
}
