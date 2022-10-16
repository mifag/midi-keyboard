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
  newMidiKeyboard: MidiKeyboardDto;
  imageUrl: string;
  statusMessage: string;

  constructor(private midiKeyboardService: MidiKeyboardService,
              private router: Router) {
    this.getAllMidiKeyboards();
  }

  // загрузка всех клавиатур
  getAllMidiKeyboards() {
    this.midiKeyboardService.getMidiKeyboards().subscribe(midiKeyboards => {
      this.midiKeyboardList = midiKeyboards;
    });
  }

  // просмотр одной клавиатуры
  viewMidiKeyboard(midiKeyboardId) {
    this.router.navigate(['midi-keyboard/view/', midiKeyboardId]);
  }

  // поиск клавиатуры
  searchMidiKeyboard() {
    if (!Object.values(this.midiKeyboardSearchDto).every(v => !v)) {
      this.midiKeyboardService.searchMidiKeyboards(this.midiKeyboardSearchDto).subscribe(midiKeyboards => {
        this.midiKeyboardList = midiKeyboards;
      });
    } else {
      this.getAllMidiKeyboards();
    }
  }

  // очистить фильтр
  clearFilter() {
    this.midiKeyboardSearchDto = new MidiKeyboardSearchDto();
    this.getAllMidiKeyboards();
  }

    // добавление клавиатуры
    addMidiKeyboard() {
      this.newMidiKeyboard = new MidiKeyboardDto();
      document.getElementById('addButton').style.display = 'none';
    }

  // отмена добавления новой клавиатуры
  cancelAddMidiKeyboard() {
    this.newMidiKeyboard = null;
    document.getElementById('addButton' ).style.display = 'block';
  }

  // сохраняем новую клавиатуру
  saveNewMidiKeyboard() {
    this.midiKeyboardService.createMidiKeyboard(this.newMidiKeyboard).subscribe(data => {
      this.statusMessage = 'Данные успешно добавлены';
    });
    this.newMidiKeyboard = null;
    this.getAllMidiKeyboards();
  }

  keysChange(){
      if(this.midiKeyboardSearchDto.keysNumber > 88) {
          this.midiKeyboardSearchDto.keysNumber = 88;
      }
  }
}
