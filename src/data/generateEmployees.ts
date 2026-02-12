import type { Employee } from '../types/employee.types'
import dayjs from 'dayjs'

const departments = ['Engineering', 'Marketing', 'Sales', 'HR']
const roles = ['Developer', 'Manager', 'Analyst', 'Designer']
const cities = ['San Francisco', 'New York', 'Chicago', 'Austin']
const skillsPool = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Python', 'AWS']

export const generateEmployees = (): Employee[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: departments[i % departments.length],
    role: roles[i % roles.length],
    salary: 60000 + i * 1500,
    joinDate: dayjs().subtract(i * 10, 'day').format('YYYY-MM-DD'),
    isActive: i % 2 === 0,
    skills: skillsPool.slice(0, (i % skillsPool.length) + 1),
    address: {
      city: cities[i % cities.length],
      state: 'CA',
      country: 'USA',
    },
    projects: i % 5,
    lastReview: dayjs().subtract(i * 5, 'day').format('YYYY-MM-DD'),
    performanceRating: (Math.random() * 5).toFixed(1) as unknown as number,
  }))
}
