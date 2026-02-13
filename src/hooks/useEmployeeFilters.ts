import { useMemo } from "react";
import type { Employee } from "../types/employee.types";
import type { FilterCondition } from "../types/filter.types";
import dayjs from "dayjs";

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const useEmployeeFilters = (
  data: Employee[],
  filters: FilterCondition[],
) => {
  return useMemo(() => {
    if (!filters) return data;

    if (!filters.length) return data;

    return data.filter((item) =>
      filters.every((filter) => {
        const value = getNestedValue(item, filter.field);

        switch (filter.operator) {
          case "equals":
            return (
              String(value).toLowerCase() === String(filter.value).toLowerCase()
            );

          case "contains":
            return String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());

          case "notContains":
            return !String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());

          case "startsWith":
            return String(value)
              .toLowerCase()
              .startsWith(String(filter.value).toLowerCase());

          case "endsWith":
            return String(value)
              .toLowerCase()
              .endsWith(String(filter.value).toLowerCase());

          case "gt":
            return Number(value) > Number(filter.value);

          case "lt":
            return Number(value) < Number(filter.value);

          case "gte":
            return Number(value) >= Number(filter.value);

          case "lte":
            return Number(value) <= Number(filter.value);

          case "between":
            if (typeof filter.value === "object") {
              if ("min" in filter.value)
                return (
                  Number(value) >= Number(filter.value.min) &&
                  Number(value) <= Number(filter.value.max)
                );

              if ("start" in filter.value)
                return (
                  dayjs(value).isAfter(dayjs(filter.value.start)) &&
                  dayjs(value).isBefore(dayjs(filter.value.end))
                );
            }
            return true;

          case "is":
            return value === filter.value;

          case "in":
            return value.some((v: any) => filter.value.includes(v));

          case "notIn":
            return !value.some((v: any) => filter.value.includes(v));

          default:
            return true;
        }
      }),
    );
  }, [data, filters]);
};
