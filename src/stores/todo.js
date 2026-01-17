import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref([])
  const filter = ref('all')
  
  // Загружаем задачи из localStorage
  if (localStorage.getItem('tasks')) {
    tasks.value = JSON.parse(localStorage.getItem('tasks'))
  }
  
  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'completed': return tasks.value.filter(t => t.completed)
      case 'active': return tasks.value.filter(t => !t.completed)
      default: return tasks.value
    }
  })
  
  function addTask(text) {
    const task = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    }
    tasks.value.push(task)
    saveToLocalStorage()
  }
  
  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveToLocalStorage()
  }
  
  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      saveToLocalStorage()
    }
  }
  
  function editTask(id, newText) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.text = newText.trim()
      saveToLocalStorage()
    }
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  
  return { 
    tasks, 
    filter, 
    filteredTasks, 
    addTask, 
    deleteTask, 
    toggleTask, 
    editTask 
  }
})