export class CreateModuleDto {
  id: number;
  name: string;
  type: string;
  location: string;
  current_value: number;
  current_state: boolean;
}
