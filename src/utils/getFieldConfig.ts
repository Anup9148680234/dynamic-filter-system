import { employeeFields } from '../data/employeeFields'

export const getFieldConfig = (key: string) => {
  return employeeFields.find(field => field.key === key)
}
