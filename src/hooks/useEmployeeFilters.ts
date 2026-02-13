import { useMemo } from 'react'
import type { Employee } from '../types/employee.types'
import type { FilterCondition } from '../types/filter.types'
import dayjs from 'dayjs'

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

const isNumberRange = (
  value: unknown
): value is { min: number; max: number } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'min' in value &&
    'max' in value
  )
}

const isDateRange = (
  value: unknown
): value is { start: string; end: string } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'start' in value &&
    'end' in value
  )
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value)
}

export const useEmployeeFilters = (
  data: Employee[],
  filters: FilterCondition[]
) => {
  return useMemo(() => {
    if (!filters.length) return data

    return data.filter((item) =>
      filters.every((filter) => {
        const rawValue = getNestedValue(item, filter.field)

        switch (filter.operator) {
          case 'equals':
            return (
              String(rawValue).toLowerCase() ===
              String(filter.value ?? '').toLowerCase()
            )

          case 'contains':
            return String(rawValue)
              .toLowerCase()
              .includes(String(filter.value ?? '').toLowerCase())

          case 'gt':
            return Number(rawValue) > Number(filter.value)

          case 'lt':
            return Number(rawValue) < Number(filter.value)

          case 'between':
            if (isNumberRange(filter.value)) {
              return (
                Number(rawValue) >= filter.value.min &&
                Number(rawValue) <= filter.value.max
              )
            }

            if (isDateRange(filter.value)) {
              return (
                dayjs(rawValue).isAfter(dayjs(filter.value.start)) &&
                dayjs(rawValue).isBefore(dayjs(filter.value.end))
              )
            }

            return true

          case 'is':
            return rawValue === filter.value

          case 'in':
            if (isStringArray(filter.value)) {
              return filter.value.includes(rawValue)
            }
            return true

          default:
            return true
        }
      })
    )
  }, [data, filters])
}
