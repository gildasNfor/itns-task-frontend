import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BesoinComponent } from './pages/besoin/besoin.component';
import { CanalComponent } from './pages/canal/canal.component';

const routes: Routes = [
  { path: '', redirectTo: 'canal', pathMatch: 'full' },
  { path: 'canal', component: CanalComponent },
  { path: 'besoin', component: BesoinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
