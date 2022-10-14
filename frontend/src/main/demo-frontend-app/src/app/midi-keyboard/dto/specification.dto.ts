import { TypeOfKeyEnum } from "./../../enums/type.of.key.enum";

export class SpecificationDto {
  id: number;
  weight: number;
  length: number;
  width: number;
  velocity: boolean;
  typeOfKey: TypeOfKeyEnum;
}