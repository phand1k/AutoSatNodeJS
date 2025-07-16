import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePasswordDTO {
  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  organizationNumber!: string;
}
