import {
  TextField,
  Stack,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import type { FieldConfig } from '../../types/filter.types'

interface Props {
  fieldConfig?: FieldConfig
  operator?: string
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

  if (fieldConfig.type === 'currency') {
    if (operator === 'between') {
      return (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="Min"
            type="number"
            value={value?.min || ''}
            onChange={(e) =>
              onChange({ ...value, min: e.target.value })
            }
          />
          <TextField
            size="small"
            placeholder="Max"
            type="number"
            value={value?.max || ''}
            onChange={(e) =>
              onChange({ ...value, max: e.target.value })
            }
          />
        </Stack>
      )
    }
  }

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

  return (
    <TextField
      size="small"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
