import type { FieldConfig } from '../types/filter.types'
import { operatorMap } from '../utils/operatorMap'

export const employeeFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    operators: operatorMap.text,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
    operators: operatorMap.text,
  },
  {
    key: 'department',
    label: 'Department',
    type: 'select',
    operators: operatorMap.select,
    options: ['Engineering', 'Marketing', 'Sales', 'HR'],
  },
  {
    key: 'salary',
    label: 'Salary',
    type: 'currency',
    operators: operatorMap.currency,
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    type: 'date',
    operators: operatorMap.date,
  },
  {
    key: 'isActive',
    label: 'Active',
    type: 'boolean',
    operators: operatorMap.boolean,
  },
  {
    key: 'skills',
    label: 'Skills',
    type: 'multi-select',
    operators: operatorMap['multi-select'],
    options: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Python', 'AWS'],
  },
  {
    key: 'address.city',
    label: 'City',
    type: 'text',
    operators: operatorMap.text,
  },
  {
    key: 'performanceRating',
    label: 'Performance Rating',
    type: 'number',
    operators: operatorMap.number,
  },
]
