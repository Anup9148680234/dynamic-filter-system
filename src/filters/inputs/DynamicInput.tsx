import {
  TextField,
  Stack,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import type { FieldConfig, Operator } from '../../types/filter.types'

interface Props {
  fieldConfig?: FieldConfig
  operator?: Operator
  value: any
  onChange: (value: any) => void
}

export const DynamicInput = ({
  fieldConfig,
  operator,
  value,
  onChange,
}: Props) => {
  if (!fieldConfig) return null

  // TEXT
  if (fieldConfig.type === 'text') {
    return (
      <TextField
        size="small"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  // NUMBER & CURRENCY
  if (fieldConfig.type === 'number' || fieldConfig.type === 'currency') {
    if (operator === 'between') {
      return (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            type="number"
            placeholder="Min"
            value={value?.min || ''}
            onChange={(e) =>
              onChange({ ...value, min: Number(e.target.value) })
            }
          />
          <TextField
            size="small"
            type="number"
            placeholder="Max"
            value={value?.max || ''}
            onChange={(e) =>
              onChange({ ...value, max: Number(e.target.value) })
            }
          />
        </Stack>
      )
    }

    return (
      <TextField
        size="small"
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    )
  }

  // DATE
  if (fieldConfig.type === 'date') {
    if (operator === 'between') {
      return (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            type="date"
            value={value?.start || ''}
            onChange={(e) =>
              onChange({ ...value, start: e.target.value })
            }
          />
          <TextField
            size="small"
            type="date"
            value={value?.end || ''}
            onChange={(e) =>
              onChange({ ...value, end: e.target.value })
            }
          />
        </Stack>
      )
    }
  }

  // SELECT
  if (fieldConfig.type === 'select') {
    return (
      <Select
        size="small"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {fieldConfig.options?.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // MULTI-SELECT
  if (fieldConfig.type === 'multi-select') {
    return (
      <Select
        multiple
        size="small"
        value={value || []}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => selected.join(', ')}
        sx={{ minWidth: 200 }}
      >
        {fieldConfig.options?.map((opt) => (
          <MenuItem key={opt} value={opt}>
            <Checkbox checked={(value || []).includes(opt)} />
            {opt}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // BOOLEAN
  if (fieldConfig.type === 'boolean') {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label="True"
      />
    )
  }

  return null
}
