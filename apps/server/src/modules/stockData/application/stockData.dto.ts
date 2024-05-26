import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class StockDataCreateDto {
  @IsString()
  @IsNotEmpty()
  date: string

  @IsNumber()
  @IsNotEmpty()
  openPrice: number

  @IsNumber()
  @IsNotEmpty()
  closePrice: number

  @IsNumber()
  @IsNotEmpty()
  highPrice: number

  @IsNumber()
  @IsNotEmpty()
  lowPrice: number

  @IsString()
  @IsNotEmpty()
  volume: string

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

export class StockDataUpdateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsNumber()
  @IsOptional()
  openPrice?: number

  @IsNumber()
  @IsOptional()
  closePrice?: number

  @IsNumber()
  @IsOptional()
  highPrice?: number

  @IsNumber()
  @IsOptional()
  lowPrice?: number

  @IsString()
  @IsOptional()
  volume?: string

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
