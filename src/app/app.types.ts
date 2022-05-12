export interface IButton {
  id: string;
  text: string;
  classes?: string;
  disabled?: boolean;
}

export interface IRow {
  id: number;
  buttons: IButton[];
}
