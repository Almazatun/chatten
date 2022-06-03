import { IsNotEmpty, IsString } from "class-validator";

export class CreatGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;
}
