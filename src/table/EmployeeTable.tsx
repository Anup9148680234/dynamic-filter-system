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
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No results found</Typography>
      </Paper>
    )
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>${emp.salary.toLocaleString()}</TableCell>
              <TableCell>{emp.address.city}</TableCell>
              <TableCell>{emp.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell>{emp.performanceRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
