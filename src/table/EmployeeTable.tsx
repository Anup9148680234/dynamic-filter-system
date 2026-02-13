import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material'
import type { Employee } from '../types/employee.types'

interface Props {
  data: Employee[]
}

export const EmployeeTable = ({ data }: Props) => {
  if (!data.length) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h6">
          No employees match your filters
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>
                ${emp.salary.toLocaleString()}
              </TableCell>
              <TableCell>{emp.address.city}</TableCell>
              <TableCell>
                {emp.isActive ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
