import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AlertCreateDto {
  @IsString()
  @IsNotEmpty()
  criteria: string

  @IsString()
  @IsNotEmpty()
  notificationMethod: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  stockId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class AlertUpdateDto {
  @IsString()
  @IsOptional()
  criteria?: string

  @IsString()
  @IsOptional()
  notificationMethod?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  stockId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
