import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])
  const filter = ref('all')
  const editingTaskId = ref(null)
  const editText = ref('')
  
  const filteredTasks = computed(() => {
    const auth = useAuthStore()
    const userTasks = tasks.value.filter(t => t.userId === auth.user?.id)
    
    switch (filter.value) {
      case 'completed': return userTasks.filter(t => t.completed)
      case 'active': return userTasks.filter(t => !t.completed)
      default: return userTasks
    }
  })
  
  function addTask(text) {
    const auth = useAuthStore()
    const task = {
      id: Date.now(),
      text,
      completed: false,
      userId: auth.user.id
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
  
  function startEditing(task) {
    editingTaskId.value = task.id
    editText.value = task.text
  }
  
  function saveEdit() {
    if (!editingTaskId.value) return
    
    const task = tasks.value.find(t => t.id === editingTaskId.value)
    if (task && editText.value.trim()) {
      task.text = editText.value.trim()
      saveToLocalStorage()
    }
    cancelEdit()
  }
  
  function cancelEdit() {
    editingTaskId.value = null
    editText.value = ''
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  
  return { 
    tasks, 
    filter, 
    filteredTasks, 
    editingTaskId,
    editText,
    addTask, 
    deleteTask, 
    toggleTask,
    startEditing,
    saveEdit,
    cancelEdit
  }
}, {
  persist: true
})
