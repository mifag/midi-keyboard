import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MidiKeyboardDto } from './../dto/midi.keyboard.dto';

@Injectable()
export class ViewMidiKeyboardService {

  constructor(private httpClient: HttpClient) {

  }

  getMidiById(midiKeyboardId): Observable<MidiKeyboardDto> {
    return this.httpClient.get<MidiKeyboardDto>('api/midiKeyboard/' + midiKeyboardId);
  }

}
