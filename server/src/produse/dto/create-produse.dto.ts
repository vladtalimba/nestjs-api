import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

// DTO for the Produs object with validation.
export class CreateProduseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumberString()
  weight: number;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsString()
  color: string;
}
