import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MidiKeyboardDto } from './../dto/midi.keyboard.dto';
import { SpecificationDto } from './../dto/specification.dto';

@Injectable()
export class ViewMidiKeyboardService {

  constructor(private httpClient: HttpClient) {

  }

  getMidiById(midiKeyboardId): Observable<MidiKeyboardDto> {
    return this.httpClient.get<MidiKeyboardDto>('api/midiKeyboard/' + midiKeyboardId);
  }

  saveSpecification(midiKeyboardId: number, newSpecification: SpecificationDto) {
    return this.httpClient.post<MidiKeyboardDto>('api/midiKeyboard/addSpecification/' + midiKeyboardId, newSpecification);
  }

  updateSpecification(specificationId: number, updatedSpecification: SpecificationDto) {
    return this.httpClient.put<SpecificationDto>('api/specification/' + specificationId, updatedSpecification)
  }

}
