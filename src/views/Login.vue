<template>
  <div class="login">
    <div class="card">
      <div class="header">
        <h2>{{ isRegister ? 'Регистрация' : 'Вход' }}</h2>
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </div>
      
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="Введите почту" required>
        <input v-model="password" type="password" placeholder="Введите пароль" required>
        
        <input v-if="isRegister" v-model="confirmPassword" type="password" placeholder="Повторите пароль" required>
        
        <p v-if="error" class="error">{{ error }}</p>
        
        <button type="submit">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
      </form>
      
      <p>
        <a href="#" @click="isRegister = !isRegister">
          {{ isRegister ? 'Вход' : 'Регистрация' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isRegister = ref(false)
const error = ref('')
const isDarkTheme = ref(false)

const auth = useAuthStore()
const router = useRouter()

// Загружаем тему из localStorage при загрузке
onMounted(() => {
  const savedTheme = localStorage.getItem('darkTheme')
  isDarkTheme.value = savedTheme === 'true'
  applyTheme()
})

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  localStorage.setItem('darkTheme', isDarkTheme.value)
  applyTheme()
}

const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

const submit = async () => {
  try {
    error.value = ''
    
    if (isRegister.value) {
      if (password.value !== confirmPassword.value) {
        throw new Error('Пароли не совпадают')
      }
      auth.register(email.value, password.value)
      isRegister.value = false
    } else {
      auth.login(email.value, password.value)
      router.push('/todo')
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
}

:deep(.dark-theme) .card {
  background: #2c3e50;
  color: #91aac7ff;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #333;
  margin: 0;
  transition: color 0.3s ease;
}

:deep(.dark-theme) h2 {
  color: #f0f0f0;
}

.theme-toggle {
  background: transparent;
  border: 2px solid #6C63FF;
  color: #6C63FF;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: #6C63FF;
  color: white;
  transform: translateY(-2px);
}

input {
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

:deep(.dark-theme) input {
  background: #34495e;
  border-color: #4a6572;
  color: #f0f0f0;
}

:deep(.dark-theme) input::placeholder {
  color: #bdc3c7;
}

input:focus {
  outline: none;
  border-color: #6C63FF;
}

button[type="submit"] {
  width: 100%;
  padding: 1rem;
  background: #6C63FF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

button[type="submit"]:hover {
  background: #5a52d5;
  transform: translateY(-2px);
}

.error {
  color: #ff6b6b;
  margin: 10px 0;
  text-align: center;
  font-weight: 500;
}

p {
  text-align: center;
  color: #666;
  transition: color 0.3s ease;
}

:deep(.dark-theme) p {
  color: #bdc3c7;
}

a {
  color: #6C63FF;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #5a52d5;
}
</style>
