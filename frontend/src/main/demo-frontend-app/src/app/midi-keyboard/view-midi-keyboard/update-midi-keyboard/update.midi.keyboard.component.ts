import { Component } from '@angular/core';


import { UpdateMidiKeyboardService } from './update.midi.keyboard.service';
import { MidiKeyboardDto } from './../../dto/midi.keyboard.dto';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'update-midi-keyboard',
  templateUrl: './update.midi.keyboard.component.html',
  styleUrls: ['./update.midi.keyboard.component.scss']
})

export class UpdateMidiKeyboardComponent {

  id: number = null;
  specificationId: number = null;
  midiKeyboardDto: MidiKeyboardDto = new MidiKeyboardDto();
//  specificationDto: SpecificationDto = new SpecificationDto();
  error:any;

  constructor(private updateMidiKeyboardService: UpdateMidiKeyboardService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    this.getMidiKeyboardById();
  }

  getMidiKeyboardById() {
    this.updateMidiKeyboardService.getMidiById(this.id).subscribe(midiKeyboard => {
      this.midiKeyboardDto = midiKeyboard;
      //this.specificationId = midiKeyboard.specificationId;
      //this.getSpecificationById();
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }


//   getSpecificationById() {
//     if (this.specificationId) {
//       this.specificationService.getSpecificationById(this.specificationId).subscribe(
//         specification => {this.specificationDto = specification;}
//       );
//     }
//   }
}
