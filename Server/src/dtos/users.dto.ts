import { IsEmail, IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;

  @IsArray()
  @IsOptional()
  public rolesActive: number[];
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
