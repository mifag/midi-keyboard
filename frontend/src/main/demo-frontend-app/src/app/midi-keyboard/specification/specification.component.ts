import { Component } from '@angular/core';
import { EnumService } from '../../util/enum.service';
import { SpecificationService } from "./specification.service";
import { SpecificationDto } from "./../dto/specification.dto";
import { Router } from "@angular/router";

@Component({
  selector: 'specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})

export class SpecificationComponent {

  specificationId = null;
  specificationData: SpecificationDto = new SpecificationDto();

  constructor(private specificationService: SpecificationService,
              public enumService: EnumService) {
  }
}
