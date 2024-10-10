export interface StepInput {
  key: string;
  customTitle?: string;
  type: 'text' | 'select-checkbox' | 'checkbox';
  format?: 'text' | 'email' | 'number';
  selectOptions?: string[];
  checkboxOptions?: string[];
  required: boolean;
}

export interface Step {
  title: string;
  order: number;
  inputs: StepInput[];
}
Array;
