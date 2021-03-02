import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentKeysComponent } from './tournament-keys.component';

const routes: Routes = [{ path: '', component: TournamentKeysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentKeysRoutingModule { }
