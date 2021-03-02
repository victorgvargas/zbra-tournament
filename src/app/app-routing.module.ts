import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'participants',
    loadChildren: () =>
      import('./modules/participants/participants.module').then(
        (m) => m.ParticipantsModule
      ),
  },
  {
    path: 'tournament-keys',
    loadChildren: () =>
      import('./modules/tournament-keys/tournament-keys.module').then(
        (m) => m.TournamentKeysModule
      ),
  },
  {
    path: '',
    redirectTo: '/participants',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/participants',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
