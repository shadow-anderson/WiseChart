import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class StockCreateDto {
  @IsString()
  @IsNotEmpty()
  symbol: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  sector?: string

  @IsString()
  @IsOptional()
  industry?: string

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

export class StockUpdateDto {
  @IsString()
  @IsOptional()
  symbol?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  sector?: string

  @IsString()
  @IsOptional()
  industry?: string

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
