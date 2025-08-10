// dto/google.dto.ts
import { IsString } from 'class-validator';
import { Request } from 'express';

export class GoogleDto {
  @IsString()
  code: string;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
}