import { Component } from '@angular/core';

import { ViewMidiKeyboardService } from './view.midi.keyboard.service';
import { MidiKeyboardDto } from './../dto/midi.keyboard.dto';
import { SpecificationDto } from './../dto/specification.dto';
import { OwnerDto } from './../../owner/dto/owner.dto';
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
  statusMessage: string;
  newSpecification: SpecificationDto;
  oldSpecification: SpecificationDto;
  isSpecificationCreate: boolean = false;
  isSpecificationUpdate: boolean = false;


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

  addSpecification() {
    this.isSpecificationCreate = true;
    this.newSpecification = new SpecificationDto();
//     document.getElementById( 'nonSpecification' ).style.display = 'none';
  }

  cancelAddSpecification() {
    this.isSpecificationCreate = false;
    this.newSpecification = null;
//    document.getElementById('nonSpecification' ).style.display = 'block';
  }

  saveSpecification() {
    this.viewMidiKeyboardService.saveSpecification(this.id, this.newSpecification).subscribe(midiKeyboard => {
      this.statusMessage = '???????????? ?????????????? ??????????????????';
      this.midiKeyboardDto = midiKeyboard;
      this.specificationId = midiKeyboard.specificationId;
      this.getSpecificationById();
    },
    error => {
      this.error = error.message;
      console.log(error);
    });
    this.isSpecificationCreate = false;
    this.newSpecification = null;
  }

  openUpdateSpecificationView() {
    this.isSpecificationUpdate = true;
    this.oldSpecification = new SpecificationDto;
    Object.assign(this.oldSpecification, this.specificationDto);
  }

  cancelUpdateSpecification() {
    this.isSpecificationUpdate = false;
    Object.assign(this.specificationDto, this.oldSpecification);
    this.oldSpecification = null;
  }

  updateSpecification() {
    this.viewMidiKeyboardService.updateSpecification(
    this.specificationId, this.specificationDto).subscribe(specification => {
      this.statusMessage = '???????????? ?????????????? ??????????????????';
      this.specificationDto = specification;
      this.getSpecificationById();
      this.isSpecificationUpdate = false;
    },
    error => {
      this.error = error.message;
      console.log(error);
    });
  }
}
