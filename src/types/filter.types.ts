export type FieldType =
  | "text"
  | "number"
  | "date"
  | "currency"
  | "select"
  | "multi-select"
  | "boolean";

export type Operator =
  | "equals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "notContains"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "between"
  | "is"
  | "isNot"
  | "in"
  | "notIn";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  operators: Operator[];
  options?: string[];
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: Operator;
  value: unknown;
}
