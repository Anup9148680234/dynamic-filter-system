import type { FieldType, Operator } from '../types/filter.types'

export const operatorMap: Record<FieldType, Operator[]> = {
  text: ['equals', 'contains', 'startsWith', 'endsWith', 'notContains'],

  number: ['equals', 'gt', 'lt', 'gte', 'lte'],

  date: ['between'],

  currency: ['between'],

  select: ['is', 'isNot'],

  'multi-select': ['in', 'notIn'],

  boolean: ['is'],
}
