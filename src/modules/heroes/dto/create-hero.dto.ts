import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  superpower: string;
}
