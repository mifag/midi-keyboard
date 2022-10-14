import { Injectable } from '@angular/core';
import { TypeOfKeyEnum } from './../enums/type.of.key.enum';
import { SexEnum } from './../enums/sex.enum';
import { SkillLevelEnum } from './../enums/skill.level.enum';

@Injectable()
export class EnumService {

  getTypeOfKeyEnumValue(typeOfKeyEnum: TypeOfKeyEnum) {
    return TypeOfKeyEnum[typeOfKeyEnum];
  }

  getSexEnumValue(sex: SexEnum) {
    return SexEnum[sex];
  }

  getSkillLevelEnumValue(skillLevel: SkillLevelEnum) {
    return SkillLevelEnum[skillLevel];
  }
}
