import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuComponent } from './main-menu/main.menu.component';
import { MidiKeyboardComponent } from './midi-keyboard/midi.keyboard.component';
import { OwnerComponent } from './owner/owner.component';
import { ViewMidiKeyboardComponent } from './midi-keyboard/view-midi-keyboard/view.midi.keyboard.component';
import { ViewOwnerComponent } from './owner/view-owner/view.owner.component';
import { SpecificationComponent } from './midi-keyboard/specification/specification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full'
  },
  {
    path: 'main-menu',
    component: MainMenuComponent
  },
  {
    path: 'midi-keyboard',
    component: MidiKeyboardComponent
  },
  {
    path: 'owner',
    component: OwnerComponent
  },
  {
    path: 'midi-keyboard/view/:id',
    component: ViewMidiKeyboardComponent
  },
  {
    path: 'owner/view/:id',
    component: ViewOwnerComponent
  },
  {
    path: 'specification',
    component: SpecificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
