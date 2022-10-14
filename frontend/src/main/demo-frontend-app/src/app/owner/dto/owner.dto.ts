import { SkillLevelEnum } from '../../enums/skill.level.enum';
import { SexEnum } from '../../enums/sex.enum';
import { MidiKeyboardDto } from '../../midi-keyboard/dto/midi.keyboard.dto';

export class OwnerDto {
  id: number;
  name: string;
  sex: SexEnum;
  age: number;
  skillLevel: SkillLevelEnum;
  midiKeyboardList: MidiKeyboardDto[];
}