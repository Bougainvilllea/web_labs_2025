import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from './auth'  // Убрали type User

export interface Task {
  id: number
  text: string
  completed: boolean
  userId: number
}

export const useTodoStore = defineStore('todo', () => {
  const savedTasks = localStorage.getItem('tasks')
  const tasks = ref<Task[]>(savedTasks ? JSON.parse(savedTasks) : [])
  const filter = ref<'all' | 'active' | 'completed'>('all')
  const editingTaskId = ref<number | null>(null)
  const editText = ref('')
  
  // Автосохранение при изменении задач
  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }, { deep: true })
  
  const filteredTasks = computed(() => {
    const auth = useAuthStore()
    const userTasks = tasks.value.filter(t => t.userId === auth.user?.id)
    
    switch (filter.value) {
      case 'completed': return userTasks.filter(t => t.completed)
      case 'active': return userTasks.filter(t => !t.completed)
      default: return userTasks
    }
  })
  
  function addTask(text: string): void {
    const auth = useAuthStore()
    if (!auth.user) return
    
    const task: Task = {
      id: Date.now(),
      text,
      completed: false,
      userId: auth.user.id
    }
    tasks.value.push(task)
  }
  
  function deleteTask(id: number): void {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
  
  function toggleTask(id: number): void {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }
  
  function startEditing(task: Task): void {
    editingTaskId.value = task.id
    editText.value = task.text
  }
  
  function saveEdit(): void {
    if (!editingTaskId.value) return
    
    const task = tasks.value.find(t => t.id === editingTaskId.value)
    if (task && editText.value.trim()) {
      task.text = editText.value.trim()
    }
    cancelEdit()
  }
  
  function cancelEdit(): void {
    editingTaskId.value = null
    editText.value = ''
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
})