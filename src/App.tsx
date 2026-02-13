import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
} from '@mui/material'
import { generateEmployees } from './data/generateEmployees'
import type { Employee } from './types/employee.types'
import type { FilterCondition } from './types/filter.types'
import { FilterPanel } from './filters/FilterPanel'
import { EmployeeTable } from './table/EmployeeTable'
import { useEmployeeFilters } from './hooks/useEmployeeFilters'

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filters, setFilters] = useState<FilterCondition[]>([])

  useEffect(() => {
    setEmployees(generateEmployees())
  }, [])

  const filtered = useEmployeeFilters(employees, filters)

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dynamic Filter System
      </Typography>

      <FilterPanel onChange={setFilters} filters={filters} />

      {filters.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ my: 2, ml: 1 }}>
          {filters.map((f) => (
            <Chip
              key={f.id}
              label={`${f.field} ${f.operator} ${JSON.stringify(f.value)}`}
              size="small"
            />
          ))}
        </Stack>
      )}


      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 3, ml: 2 }}>
        Showing {filtered.length} of {employees.length} employees
      </Typography>
      
      <Divider sx={{ my: 3 }} />

      <EmployeeTable data={filtered} />
    </Container>
  )
}

export default App
