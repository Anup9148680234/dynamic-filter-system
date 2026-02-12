import { Box, IconButton, MenuItem, Select, Stack } from "@mui/material";
import { Trash2 } from "lucide-react";
import type { FilterCondition } from "../types/filter.types";
import { employeeFields } from "../data/employeeFields";
import { getFieldConfig } from "../utils/getFieldConfig";
import { DynamicInput } from "./inputs/DynamicInput";

interface Props {
  filter: FilterCondition;
  onUpdate: (filter: FilterCondition) => void;
  onRemove: (id: string) => void;
}

export const FilterRow = ({ filter, onUpdate, onRemove }: Props) => {
  const fieldConfig = getFieldConfig(filter.field);

  const handleFieldChange = (field: string) => {
    const config = getFieldConfig(field);

    onUpdate({
      ...filter,
      field,
      operator: config?.operators[0] || "equals",
      value: "",
    });
  };

  const handleOperatorChange = (operator: any) => {
    onUpdate({ ...filter, operator });
  };

  const handleValueChange = (value: any) => {
    onUpdate({ ...filter, value });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Field Selector */}
      <Select
        value={filter.field}
        onChange={(e) => handleFieldChange(e.target.value)}
        displayEmpty
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">Select Field</MenuItem>
        {employeeFields.map((field) => (
          <MenuItem key={field.key} value={field.key}>
            {field.label}
          </MenuItem>
        ))}
      </Select>

      {/* Operator Selector */}
      <Select
        value={filter.operator}
        onChange={(e) => handleOperatorChange(e.target.value)}
        disabled={!fieldConfig}
        sx={{ minWidth: 150 }}
      >
        {fieldConfig?.operators.map((op) => (
          <MenuItem key={op} value={op}>
            {op}
          </MenuItem>
        ))}
      </Select>

      {/* Dynamic Input */}
      <DynamicInput
        fieldConfig={fieldConfig}
        operator={filter.operator}
        value={filter.value}
        onChange={handleValueChange}
      />

      {/* Remove Button */}
      <IconButton onClick={() => onRemove(filter.id)}>
        <Trash2 size={18} />
      </IconButton>
    </Stack>
  );
};
