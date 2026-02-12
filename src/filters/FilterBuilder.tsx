import { useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { Plus } from 'lucide-react'
import { v4 as uuid } from 'uuid'
import type { FilterCondition } from '../types/filter.types'
import { FilterRow } from './FilterRow'

interface Props {
  onChange: (filters: FilterCondition[]) => void
}

export const FilterBuilder = ({ onChange }: Props) => {
  const [filters, setFilters] = useState<FilterCondition[]>([])

  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: uuid(),
      field: '',
      operator: 'equals',
      value: '',
    }

    const updated = [...filters, newFilter]
    setFilters(updated)
    onChange(updated)
  }

  const updateFilter = (updatedFilter: FilterCondition) => {
    const updated = filters.map(f =>
      f.id === updatedFilter.id ? updatedFilter : f
    )

    setFilters(updated)
    onChange(updated)
  }

  const removeFilter = (id: string) => {
    const updated = filters.filter(f => f.id !== id)
    setFilters(updated)
    onChange(updated)
  }

  const clearFilters = () => {
    setFilters([])
    onChange([])
  }

  return (
    <Box>
      <Stack spacing={2}>
        {filters.map(filter => (
          <FilterRow
            key={filter.id}
            filter={filter}
            onUpdate={updateFilter}
            onRemove={removeFilter}
          />
        ))}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={addFilter}
          >
            Add Filter
          </Button>

          <Button variant="outlined" onClick={clearFilters}>
            Clear All
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
