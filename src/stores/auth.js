import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const users = ref(JSON.parse(localStorage.getItem('users')) || [])
  
  const isLoggedIn = computed(() => !!user.value)
  
  function register(email, password) {
    if (users.value.find(u => u.email === email)) {
      throw new Error('User already exists')
    }
    
    const newUser = { id: Date.now(), email, password }
    users.value.push(newUser)
    user.value = newUser
    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem('user', JSON.stringify(newUser))
  }
  
  function login(email, password) {
    const foundUser = users.value.find(u => u.email === email && u.password === password)
    if (!foundUser) throw new Error('Wrong email or password')
    
    user.value = foundUser
    localStorage.setItem('user', JSON.stringify(foundUser))
  }
  
  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }
  
  return { user, isLoggedIn, register, login, logout }
})