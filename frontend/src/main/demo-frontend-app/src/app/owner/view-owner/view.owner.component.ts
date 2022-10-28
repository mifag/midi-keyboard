import { Component } from '@angular/core';

import { ViewOwnerService } from './view.owner.service';
import { MidiKeyboardDto } from './../../midi-keyboard/dto/midi.keyboard.dto';
import { OwnerDto } from './../dto/owner.dto';
import { EnumService } from './../../util/enum.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-owner',
  templateUrl: './view.owner.component.html',
  styleUrls: ['./view.owner.component.scss']
})

export class ViewOwnerComponent{

  id: number = null;
  ownerDto: OwnerDto = new OwnerDto();
  error:any;
  selectedKeyboard: MidiKeyboardDto;
  selectedMidiKeyboardId: number;
  midiKeyboard: MidiKeyboardDto;
  midiKeyboardList: MidiKeyboardDto[] = [];

  constructor(private viewOwnerService: ViewOwnerService,
              public enumService: EnumService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    this.getOwnerById();
  }


  getOwnerById() {
    this.viewOwnerService.getOwnerById(this.id).subscribe(owner => {
      this.ownerDto = owner;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  // загрузка всех клавиатур для выбора
  getAllMidiKeyboards() {
    this.viewOwnerService.getMidiKeyboards().subscribe(midiKeyboards => {
      this.midiKeyboardList = midiKeyboards;
    });
  }

  // выбор клавиатуры для добавления
  selectMidiKeyboard(event: any) {
    this.selectedMidiKeyboardId = event.target.value;
    console.log("this.selectedMidiKeyboardId:", this.selectedMidiKeyboardId);
  }

  // добавление клавиатуры владельцу
  createMidiKeyboardMap() {
    this.viewOwnerService.addMidiKeyboardMap(this.id, this.selectedMidiKeyboardId).subscribe(response => {
      this.ownerDto.midiKeyboardList.push(response);
    });
    console.log(this.id, this.selectedMidiKeyboardId);
  }

  // просмотр мидиклавиатуры
  viewMidiKeyboard(midiKeyboardId) {
    this.router.navigate(['midi-keyboard/view/', midiKeyboardId]);
  }
}
