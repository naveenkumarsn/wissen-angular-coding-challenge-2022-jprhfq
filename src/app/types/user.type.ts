/** Add your types here */
export interface UserData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
export interface Response {
  data: UserData[];
}
