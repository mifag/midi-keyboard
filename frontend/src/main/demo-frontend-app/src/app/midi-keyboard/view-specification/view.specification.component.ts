import { Component } from '@angular/core';
import { EnumService } from '../../util/enum.service';
import { ViewSpecificationService } from "./view.specification.service";
import { SpecificationDto } from "./../dto/specification.dto";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'specification/view/:id',
  templateUrl: './view.specification.component.html',
  styleUrls: ['./view.specification.component.scss']
})

export class ViewSpecificationComponent {

  specificationId = null;
  specificationDto: SpecificationDto = new SpecificationDto();
  isSpecificationUpdate: boolean = false;
  statusMessage: string;
  error:any;
  newSpecification: SpecificationDto;
  oldSpecification: SpecificationDto;

  constructor(private viewSpecificationService: ViewSpecificationService,
              public enumService: EnumService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.specificationId = activateRoute.snapshot.params['id'];
    this.getSpecificationById();
  }

  getSpecificationById() {
      if (this.specificationId) {
        this.viewSpecificationService.getSpecificationById(this.specificationId).subscribe(
          specification => {this.specificationDto = specification;}
        );
      }
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
    this.viewSpecificationService.updateSpecification(
    this.specificationId, this.specificationDto).subscribe(specification => {
      this.statusMessage = 'Данные успешно обновлены';
      this.specificationDto = specification;
      this.getSpecificationById();
      this.isSpecificationUpdate = false;
      this.oldSpecification = null;
    },
    error => {
      this.error = error.message;
      console.log(error);
    });
  }


}
