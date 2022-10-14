import { Component, OnInit } from '@angular/core';

import { TemplateRef, ViewChild } from '@angular/core';
import { OwnerService } from './owner.service';
import { OwnerDto } from './dto/owner.dto';
import { EnumService } from './../util/enum.service';
import { SkillLevelEnum } from './../enums/skill.level.enum';
import { Router } from "@angular/router";


@Component({
  selector: 'owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})

export class OwnerComponent implements OnInit {
  //типы шаблонов
  @ViewChild('viewTemplate', {static: false}) viewTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  newOwner: OwnerDto;
  editedOwner: OwnerDto;
  deletedOwner: OwnerDto = new OwnerDto;
  owners: Array<OwnerDto>;
  statusMessage: string;
  statusErrorMessage: string;

  constructor(private router: Router,
              private service: OwnerService,
              public enumService: EnumService) {
    this.owners = new Array<OwnerDto>();
  }


  ngOnInit() {
    this.loadOwners();
  }

  //загрузка владельцев
  private loadOwners() {
    this.service.getOwners().subscribe((data: OwnerDto[]) => {
      this.owners = data;
    });
  }

  // загружаем один из двух шаблонов
  loadTemplate(owner: OwnerDto) {
    if (this.editedOwner && this.editedOwner.id === owner.id) {
      return this.editTemplate;
    } else {
      return this.viewTemplate;
    }
  }

  // добавление владельца
  addOwner() {
    this.newOwner = new OwnerDto();
    document.getElementById('addButton').style.display = 'none';
  }

  // отмена добавления нового владельца
  cancelAddOwner() {
    this.owners.pop();
    this.newOwner = null;
    document.getElementById('addButton' ).style.display = 'block';
  }

  // сохраняем нового владельца
  saveNewOwner() {
    this.service.createOwner(this.newOwner).subscribe(data => {
      this.statusMessage = 'Данные успешно добавлены';
    });
    this.newOwner = null;
    this.loadOwners();
  }

  // редактирование владельца
  editOwner(owner: OwnerDto) {
    this.editedOwner = owner;
  }

  // отмена редактирования
  cancel() {
    this.editedOwner = null;
  }

  // изменяем владельца
  saveOwner() {
    this.service.updateOwner(this.editedOwner).subscribe(data => {
      this.statusMessage = 'Данные успешно обновлены',
      this.loadOwners();
    });
    this.editedOwner = null;
  }

  // подтверждение удаления
  confirmDelete(owner: OwnerDto) {
    this.deletedOwner = owner;
    document.getElementById("confirmDeleteOwner").style.display = 'block';
  }

  // отмена удаления
  cancelDelete() {
    this.loadOwners();
  }

  // удаление владельца
  deleteOwner(owner: OwnerDto) {
    this.service.deleteOwner(owner.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
      this.loadOwners();
    });
  }

  // просмотр владельца
  viewOwner(ownerId) {
    this.router.navigate(['owner/view/', ownerId]);
  }
}
