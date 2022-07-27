import { IsString, IsBoolean, IsOptional, IsDecimal, IsInt } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  public subject: string;

  @IsString()
  public description: string;

  @IsOptional()
  @IsInt()
  public requestFromId: number;

  @IsInt()
  public assignToId: number;

  @IsInt()
  public issueStatusId: number;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;
}

export class UpdateIssueStatusDto {
  
  @IsInt()
  public issueStatusId: number;

}
