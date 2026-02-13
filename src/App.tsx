import { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
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
    const data = generateEmployees()
    setEmployees(data)
  }, [])

  const filteredEmployees = useEmployeeFilters(employees, filters)

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dynamic Filter System
      </Typography>

      <FilterPanel onChange={setFilters} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Showing {filteredEmployees.length} of {employees.length} employees
        </Typography>
      </Box>

      <EmployeeTable data={filteredEmployees} />
    </Container>
  )
}

export default App
