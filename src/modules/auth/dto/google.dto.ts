// dto/google.dto.ts
import { IsString } from 'class-validator';

export class GoogleDto {
  @IsString()
  code: string;
}
