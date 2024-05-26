import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UserStockPreferenceCreateDto {
  @IsString()
  @IsOptional()
  chartSettings?: string

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

export class UserStockPreferenceUpdateDto {
  @IsString()
  @IsOptional()
  chartSettings?: string

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
