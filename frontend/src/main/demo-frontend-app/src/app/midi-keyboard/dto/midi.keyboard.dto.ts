import { OwnerDto } from '../../owner/dto/owner.dto';


export class MidiKeyboardDto {
  id: number;
  model: string;
  manufacturer: string;
  keysNumber: number;
  hasMidiOut: boolean;
  price: number;
  specificationId: number;
  owners: OwnerDto[];
}
