import { IsNumberString, IsAlphanumeric ,IsInt, Min, Max, IsString} from "class-validator"

// validator for paginated result
export class queryPageDto {
  @IsNumberString()
  // @IsInt()
  // @Min(0)
  // @Max(50)
  page: number;
}

// validator for userId param
export class paramUserIdDto{
  @IsString()
  // @IsAlphanumeric()
  userId: string;
}
