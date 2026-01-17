<template>
  <div class="todo">
    <div class="input-section">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="Введите задачу и нажмите Enter"
        class="task-input"
      >
      <select v-model="filter" class="filter-select">
        <option value="all">Все</option>
        <option value="active">Активные</option>
        <option value="completed">Завершенные</option>
      </select>
    </div>

    <div class="search-section">
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          @input="handleSearch" 
          placeholder="Поиск по задачам..."
          class="search-input"
        >
        
      </div>
    </div>
    
    <div class="tasks">
      <div v-for="task in sortedAndSearchedTasks" :key="task.id" class="task-item">
        <input 
          type="checkbox" 
          :checked="task.completed" 
          @change="toggleTask(task.id)"
          class="task-checkbox"
        >
        
        <div v-if="editingTaskId === task.id" class="edit-mode">
          <input 
            v-model="editText" 
            @keyup.enter="saveEdit(task.id)"
            @keyup.escape="cancelEdit"
            @blur="saveEdit(task.id)"
            class="edit-input"
            ref="editInputRef"
          >
        </div>
        <div v-else class="view-mode">
          <span 
            :class="{ completed: task.completed }"
            class="task-text"
            @dblclick="startEditing(task)"
          >{{ task.text }}</span>
        </div>
        
        <div class="task-actions">
          <button 
            v-if="editingTaskId !== task.id"
            @click="startEditing(task)" 
            class="edit-btn"
            title="Редактировать"
          >✏️</button>
          <button @click="deleteTask(task.id)" class="delete-btn" title="Удалить">×</button>
        </div>
      </div>
      
      <p v-if="sortedAndSearchedTasks.length === 0" class="empty-message">
        {{ getEmptyMessage() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTodoStore } from '../stores/todo'

const newTask = ref('')
const searchQuery = ref('')
const todoStore = useTodoStore()
const editingTaskId = ref(null)
const editText = ref('')
const editInputRef = ref(null)

const filter = computed({
  get: () => todoStore.filter,
  set: (value) => todoStore.filter = value
})

const filteredTasks = computed(() => {
  let tasks = todoStore.filteredTasks
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    tasks = tasks.filter(task => 
      task.text.toLowerCase().includes(query)
    )
  }
  
  return tasks
})

const sortedAndSearchedTasks = computed(() => {
  const tasks = [...filteredTasks.value]
  
  // Сначала сортируем по статусу: незавершенные сверху
  tasks.sort((a, b) => {
    if (a.completed && !b.completed) return 1
    if (!a.completed && b.completed) return -1
    return 0
  })
  
  tasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id // Новые задачи (больший ID) будут первыми
    }
    return 0
  })
  
  return tasks
})

const addTask = () => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (id) => {
  todoStore.deleteTask(id)
}

const toggleTask = (id) => {
  todoStore.toggleTask(id)
}

const startEditing = (task) => {
  editingTaskId.value = task.id
  editText.value = task.text
  nextTick(() => {
    editInputRef.value?.focus()
  })
}

const saveEdit = (id) => {
  if (editText.value.trim()) {
    todoStore.editTask(id, editText.value)
  }
  editingTaskId.value = null
  editText.value = ''
}

const cancelEdit = () => {
  editingTaskId.value = null
  editText.value = ''
}

const handleSearch = () => {
}

const getEmptyMessage = () => {
  if (searchQuery.value.trim()) {
    return 'Задачи не найдены'
  }
  
  switch (filter.value) {
    case 'completed': return 'Завершенных задач пока нет'
    case 'active': return 'Активных задач пока нет'
    default: return 'Задач пока нет'
  }
}
</script>

<style scoped>
.todo {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

body.dark-theme .todo {
  background: #c99565c2;; 
  color: black;
}

.input-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.task-input:focus {
  outline: none;
  border-color: #6C63FF;
}

.filter-select {
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  min-width: 140px;
}

.search-section {
  margin-bottom: 25px;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 1px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #6C63FF;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  pointer-events: none;
}

.tasks {
  max-height: 500px;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.task-item:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6C63FF;
}

.view-mode {
  flex: 1;
}

.task-text {
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.task-text:hover {
  background: rgba(108, 99, 255, 0.1);
}

.task-text.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.edit-mode {
  flex: 1;
}

.edit-input {
  width: 100%;
  padding: 10px 1px;
  border: 2px solid #6C63FF;
  border-radius: 6px;
  font-size: 16px;
  background: white;
}

.edit-input:focus {
  outline: none;
}

.task-actions {
  display: flex;
  gap: 6px;
}

.edit-btn, .delete-btn {
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.edit-btn {
  background: #ffd166;
  color: #333;
}

.edit-btn:hover {
  background: #ffc847;
  transform: scale(1.05);
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  font-weight: bold;
}

.delete-btn:hover {
  background: #ff5252;
  transform: scale(1.05);
}

.empty-message {
  text-align: center;
  color: #000000ff;
  font-style: italic;
  padding: 40px;
  font-size: 16px;
}
</style>