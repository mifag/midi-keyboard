import { Component } from '@angular/core';

import { MidiKeyboardService } from './midi.keyboard.service';
import { MidiKeyboardDto } from './dto/midi.keyboard.dto';
import { MidiKeyboardSearchDto } from './dto/midi.keyboard.search.dto';
import { Router } from "@angular/router";


@Component({
  selector: 'midi-keyboard',
  templateUrl: './midi.keyboard.component.html',
  styleUrls: ['./midi.keyboard.component.scss']
})
export class MidiKeyboardComponent {

  midiKeyboardList: MidiKeyboardDto[] = [];
  midiKeyboardSearchDto: MidiKeyboardSearchDto = new MidiKeyboardSearchDto;
  imageUrl: string;

  constructor(private midiKeyboardService: MidiKeyboardService,
              private router: Router) {
    this.getAllMidiKeyboards();
  }

  getAllMidiKeyboards() {
    this.midiKeyboardService.getMidiKeyboards().subscribe(midiKeyboards => {
      this.midiKeyboardList = midiKeyboards;
    });
  }

  viewMidiKeyboard(midiKeyboardId) {
    this.router.navigate(['midi-keyboard/view/', midiKeyboardId]);
  }

  searchMidiKeyboard() {
    if (!Object.values(this.midiKeyboardSearchDto).every(v => !v)) {
      this.midiKeyboardService.searchMidiKeyboards(this.midiKeyboardSearchDto).subscribe(midiKeyboards => {
        this.midiKeyboardList = midiKeyboards;
      });
    } else {
      this.getAllMidiKeyboards();
    }
  }

  clearFilter() {
    this.midiKeyboardSearchDto = new MidiKeyboardSearchDto();
    this.getAllMidiKeyboards();
  }

  keysChange(){
      if(this.midiKeyboardSearchDto.keysNumber > 88) {
          this.midiKeyboardSearchDto.keysNumber = 88;
      }
  }
}
