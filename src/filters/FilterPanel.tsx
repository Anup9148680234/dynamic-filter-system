import { Card, CardContent, Typography } from '@mui/material'
import { FilterBuilder } from './FilterBuilder'
import type { FilterCondition } from '../types/filter.types'

interface Props {
  onChange: (filters: FilterCondition[]) => void
}

export const FilterPanel = ({ onChange }: Props) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>

        <FilterBuilder onChange={onChange} />
      </CardContent>
    </Card>
  )
}
