import {
  Box,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material'
import { Trash2 } from 'lucide-react'
import { employeeFields } from '../data/employeeFields'
import type { FilterCondition } from '../types/filter.types'
import { DynamicInput } from './inputs/DynamicInput'

interface Props {
  filter: FilterCondition
  onUpdate: (filter: FilterCondition) => void
  onRemove: (id: string) => void
}

export const FilterRow = ({ filter, onUpdate, onRemove }: Props) => {
  const fieldConfig = employeeFields.find(
    (f) => f.key === filter.field
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        transition: '0.2s',
        '&:hover': {
          boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
        },
      }}
    >
      <Select
        value={filter.field}
        displayEmpty
        onChange={(e) =>
          onUpdate({ ...filter, field: e.target.value })
        }
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">Select Field</MenuItem>
        {employeeFields.map((field) => (
          <MenuItem key={field.key} value={field.key}>
            {field.label}
          </MenuItem>
        ))}
      </Select>

      {fieldConfig && (
        <Select
          value={filter.operator}
          onChange={(e) =>
            onUpdate({ ...filter, operator: e.target.value })
          }
          sx={{ minWidth: 150 }}
        >
          {fieldConfig.operators.map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
      )}

      <DynamicInput
        fieldConfig={fieldConfig}
        operator={filter.operator}
        value={filter.value}
        onChange={(value) =>
          onUpdate({ ...filter, value })
        }
      />

      <IconButton onClick={() => onRemove(filter.id)}>
        <Trash2 size={18} />
      </IconButton>
    </Box>
  )
}
