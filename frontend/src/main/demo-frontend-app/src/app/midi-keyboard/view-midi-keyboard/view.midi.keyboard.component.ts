import { Component } from '@angular/core';

import { ViewMidiKeyboardService } from './view.midi.keyboard.service';
import { MidiKeyboardDto } from './../dto/midi.keyboard.dto';
import { SpecificationDto } from './../dto/specification.dto';
import { SpecificationService } from './../specification/specification.service';
import { EnumService } from './../../util/enum.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-midi-keyboard',
  templateUrl: './view.midi.keyboard.component.html',
  styleUrls: ['./view.midi.keyboard.component.scss']
})

export class ViewMidiKeyboardComponent {

  id: number = null;
  specificationId: number = null;
  midiKeyboardDto: MidiKeyboardDto = new MidiKeyboardDto();
  specificationDto: SpecificationDto = new SpecificationDto();
  error:any;

  constructor(private viewMidiKeyboardService: ViewMidiKeyboardService,
              private specificationService: SpecificationService,
              public enumService: EnumService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    this.getMidiKeyboardById();
  }

  getMidiKeyboardById() {
    this.viewMidiKeyboardService.getMidiById(this.id).subscribe(midiKeyboard => {
      this.midiKeyboardDto = midiKeyboard;
      this.specificationId = midiKeyboard.specificationId;
      this.getSpecificationById();
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  getSpecificationById() {
    if (this.specificationId) {
      this.specificationService.getSpecificationById(this.specificationId).subscribe(
        specification => {this.specificationDto = specification;}
      );
    }
  }

  viewOwner(ownerId) {
    this.router.navigate(['owner/view/', ownerId]);
  }
}