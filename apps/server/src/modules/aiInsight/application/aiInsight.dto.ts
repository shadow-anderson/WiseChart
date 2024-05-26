import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AiInsightCreateDto {
  @IsString()
  @IsNotEmpty()
  insightText: string

  @IsString()
  @IsNotEmpty()
  predictionDate: string

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

export class AiInsightUpdateDto {
  @IsString()
  @IsOptional()
  insightText?: string

  @IsString()
  @IsOptional()
  predictionDate?: string

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
