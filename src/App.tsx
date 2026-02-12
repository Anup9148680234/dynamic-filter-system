import { useState } from 'react'
import { FilterBuilder } from './filters/FilterBuilder'
import type { FilterCondition } from './types/filter.types'

export default function App() {
  const [filters, setFilters] = useState<FilterCondition[]>([])

  return (
    <>
      <FilterBuilder onChange={setFilters} />
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </>
  )
}