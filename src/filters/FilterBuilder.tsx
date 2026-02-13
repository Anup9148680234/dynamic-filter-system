import { Box, Button, Stack } from "@mui/material";
import { Plus } from "lucide-react";
import { v4 as uuid } from "uuid";
import type { FilterCondition } from "../types/filter.types";
import { FilterRow } from "./FilterRow";

interface Props {
  onChange: (filters: FilterCondition[]) => void;
  filters: FilterCondition[];
}

export const FilterBuilder = ({ onChange, filters }: Props) => {
  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: uuid(),
      field: "",
      operator: "equals",
      value: "",
    };

    const updated: FilterCondition[] = [...filters, newFilter];

    onChange(updated);
  };

  const updateFilter = (updatedFilter: FilterCondition) => {
    const updated = filters.map((f) =>
      f.id === updatedFilter.id ? updatedFilter : f,
    );
    onChange(updated);
  };

  const removeFilter = (id: string) => {
    onChange(filters.filter((f) => f.id !== id));
  };

  return (
    <Box>
      <Stack spacing={2}>
        {filters.map((filter) => (
          <FilterRow
            key={filter.id}
            filter={filter}
            onUpdate={updateFilter}
            onRemove={removeFilter}
          />
        ))}

        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={addFilter}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Add Filter
        </Button>
      </Stack>
    </Box>
  );
};
