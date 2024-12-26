/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParams {
  name: string;
  input: 'array' | 'string' | 'number' | 'boolean' | 'yesno';
  description: string;
  values?: any[];
}