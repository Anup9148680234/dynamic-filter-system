import { http, HttpResponse } from 'msw'
import { generateEmployees } from '../data/generateEmployees'

const employees = generateEmployees()

export const handlers = [
  http.get('/employees', () => {
    return HttpResponse.json(employees)
  }),
]
