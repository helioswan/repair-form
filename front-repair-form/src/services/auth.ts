import type { User } from '@/types/Auth'

export async function login(user: User) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  return await fetch(import.meta.env.VITE_API_URL + '/login', requestOptions)
}

export async function register(user: User) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    return await fetch(import.meta.env.VITE_API_URL + '/register', requestOptions)
  }