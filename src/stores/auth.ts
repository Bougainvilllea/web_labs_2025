import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const users = ref<User[]>(JSON.parse(localStorage.getItem('users') || '[]'))
  
  const isLoggedIn = computed(() => !!user.value)
  
  function register(email: string, password: string): void {
    if (users.value.find(u => u.email === email)) {
      throw new Error('User already exists')
    }
    
    const newUser: User = { id: Date.now(), email, password }
    users.value.push(newUser)
    user.value = newUser
    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem('user', JSON.stringify(newUser))
  }
  
  function login(email: string, password: string): void {
    const foundUser = users.value.find(u => u.email === email && u.password === password)
    if (!foundUser) throw new Error('Wrong email or password')
    
    user.value = foundUser
    localStorage.setItem('user', JSON.stringify(foundUser))
  }
  
  function logout(): void {
    user.value = null
    localStorage.removeItem('user')
  }
  
  return { 
    user, 
    users,
    isLoggedIn, 
    register, 
    login, 
    logout 
  }
})