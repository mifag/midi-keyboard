import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerDto } from './../dto/owner.dto';
import { OwnerKeyboardMapDto } from './../dto/owner.keyboard.map.dto';
import { MidiKeyboardDto } from './../../midi-keyboard/dto/midi.keyboard.dto';


@Injectable()
export class ViewOwnerService {

  constructor(private httpClient: HttpClient) {

  }

  getOwnerById(ownerId): Observable<OwnerDto> {
    return this.httpClient.get<OwnerDto>('api/owner/' + ownerId);
  }


  getMidiKeyboards(): Observable<MidiKeyboardDto[]> {
    return this.httpClient.get<MidiKeyboardDto[]>('/api/midiKeyboard/allRecords');
  }

  addMidiKeyboardMap(ownerId, selectedMidiKeyboardId): Observable<MidiKeyboardDto> {
    let ownerKeyboardMapDto: OwnerKeyboardMapDto = new OwnerKeyboardMapDto();
    ownerKeyboardMapDto.midiKeyboardId = selectedMidiKeyboardId;
    ownerKeyboardMapDto.ownerId = ownerId;
    return this.httpClient.post<MidiKeyboardDto>('api/owner/' + ownerId
    + '/midiKeyboard/' + selectedMidiKeyboardId, null);

//    return this.httpClient.post<MidiKeyboardDto>('/api/owner/midiKeyboard/map', ownerKeyboardMapDto);
  }

}
