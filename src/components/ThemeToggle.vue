<template>
  <button @click="toggleTheme" class="theme-toggle" :title="isDarkTheme ? 'Светлая тема' : 'Тёмная тема'">
    {{ isDarkTheme ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkTheme = ref(false)
const emit = defineEmits(['themeChange'])

onMounted(() => {
  const savedTheme = localStorage.getItem('darkTheme')
  isDarkTheme.value = savedTheme === 'true'
  applyTheme()
})

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  localStorage.setItem('darkTheme', isDarkTheme.value)
  applyTheme()
  emit('themeChange', isDarkTheme.value)
}

const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}
</script>

<style scoped lang="scss">
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

  &:hover {
    background: #6C63FF;
    color: white;
    transform: translateY(-2px);
  }
}
</style>