import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentKeysRoutingModule } from './tournament-keys-routing.module';
import { TournamentKeysComponent } from './tournament-keys.component';

import { NgTournamentTreeModule } from 'ng-tournament-tree';

@NgModule({
  declarations: [TournamentKeysComponent],
  imports: [
    CommonModule,
    TournamentKeysRoutingModule,

    NgTournamentTreeModule,
  ]
})
export class TournamentKeysModule { }
