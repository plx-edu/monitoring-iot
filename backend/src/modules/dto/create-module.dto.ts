export class CreateModuleDto {
  id: number;
  name: string;
  type: number;
  location: string;
  current_value: number;
  current_state: boolean;
  uptime_start: Date;
}
