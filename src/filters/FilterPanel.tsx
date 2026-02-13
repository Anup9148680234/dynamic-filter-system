import { Card, CardContent, Typography } from '@mui/material'
import { FilterBuilder } from './FilterBuilder'
import type { FilterCondition } from '../types/filter.types'

interface Props {
  onChange: (filters: FilterCondition[]) => void
  filters: FilterCondition[]
}

export const FilterPanel = ({ onChange, filters }: Props) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        backgroundColor: '#fafafa',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Filters
        </Typography>

        <FilterBuilder onChange={onChange} filters={filters} />
      </CardContent>
    </Card>
  )
}
