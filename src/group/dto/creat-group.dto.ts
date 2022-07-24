import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isPrivate!: boolean;
}
