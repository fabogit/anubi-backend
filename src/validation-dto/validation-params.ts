import { IsInt, Min, Max, IsString} from "class-validator"
import { Type } from 'class-transformer';

// validator for paginated result
export class queryPageDto {
  @IsInt()
  @Min(1)
  @Max(2)
  @Type(() => Number)
  page: number;
}

// validator for userId param
export class paramUserIdDto{
  @IsString()
  @Type(() => String)
  userId: string;
}
