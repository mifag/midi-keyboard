import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main.menu.component';
import { MidiKeyboardComponent } from './midi-keyboard/midi.keyboard.component';
import { ViewMidiKeyboardComponent } from './midi-keyboard/view-midi-keyboard/view.midi.keyboard.component';
import { ViewOwnerComponent } from './owner/view-owner/view.owner.component';
import { SpecificationComponent } from './midi-keyboard/specification/specification.component'
import { OwnerComponent } from './owner/owner.component';
import { MidiKeyboardService } from './midi-keyboard/midi.keyboard.service';
import { OwnerService } from './owner/owner.service';
import { ViewMidiKeyboardService } from './midi-keyboard/view-midi-keyboard/view.midi.keyboard.service';
import { ViewOwnerService } from './owner/view-owner/view.owner.service';
import { SpecificationService } from './midi-keyboard/specification/specification.service';
import { EnumService } from './util/enum.service';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MidiKeyboardComponent,
    OwnerComponent,
    ViewMidiKeyboardComponent,
    ViewOwnerComponent,
    SpecificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    MidiKeyboardService,
    OwnerService,
    ViewMidiKeyboardService,
    ViewOwnerService,
    SpecificationService,
    EnumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
