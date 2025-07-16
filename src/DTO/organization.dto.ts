import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrganizationDTO {
  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsNumber()
  pinCode!: number;

  @IsNumber()
  test!: number;
}
