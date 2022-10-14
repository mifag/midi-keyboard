import { Component } from '@angular/core';

import { ViewOwnerService } from './view.owner.service';
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

  viewMidiKeyboard(midiKeyboardId) {
    this.router.navigate(['midi-keyboard/view/', midiKeyboardId]);
  }
}
