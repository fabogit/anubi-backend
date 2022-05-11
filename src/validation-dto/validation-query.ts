import { IsNumberString, IsInt, Min, Max } from "class-validator"

export class queryPageNumberDto {
  @IsNumberString()
  // @IsInt()
  // @Min(0)
  // @Max(50)
  page: number;
}
