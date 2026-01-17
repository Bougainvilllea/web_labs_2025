<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <nav v-if="$route.path !== '/login'" class="navbar">
      <div class="nav-brand">
        <router-link to="/todo" class="brand-link">📖 To-Do</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/todo" class="nav-link">Задачи</router-link>
        <router-link to="/about" class="nav-link">Инфо</router-link>
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
        <button @click="logout" class="logout-btn">Выход</button>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const isDarkTheme = ref(false)

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

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
  transition: all 0.3s ease;
}

body.dark-theme {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: #f0f0f0;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.dark-theme .navbar {
  background: rgba(44, 62, 80, 0.95);
  color: #f0f0f0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand .brand-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6C63FF;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #555;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.dark-theme .nav-link {
  color: #ddd;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #6C63FF;
}

.dark-theme .nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #6C63FF;
}

.nav-link.router-link-active {
  background: #6C63FF;
  color: white;
}

.theme-toggle {
  background: transparent;
  border: 2px solid #6C63FF;
  color: #6C63FF;
  padding: 0.5rem;
  border-radius: 6px;
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
  transform: translateY(-1px);
}

.logout-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #ff5252;
  transform: translateY(-1px);
}

.main-content {
  padding: 2rem;
  min-height: calc(100vh - 80px);
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>
