<template>
  <div class="todo-container">
    <div class="todo-card">
      <h1>Мои задачи:</h1>
      
      <div class="controls">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Введите задачу и нажмите enter"
          class="task-input"
        >
        <select v-model="todoStore.filter" class="filter-select">
          <option value="all">Все⚪</option>
          <option value="active">Активные❌</option>
          <option value="completed">Завершенные✔️</option>
        </select>
      </div>
      
      <div class="tasks-list">
        <div 
          v-for="task in todoStore.filteredTasks" 
          :key="task.id" 
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <input 
            type="checkbox" 
            :checked="task.completed"
            @change="todoStore.toggleTask(task.id)"
            class="task-checkbox"
          >
          
          <div v-if="todoStore.editingTaskId === task.id" class="edit-mode">
            <input 
              v-model="todoStore.editText" 
              @keyup.enter="todoStore.saveEdit"
              @keyup.escape="todoStore.cancelEdit"
              @blur="todoStore.saveEdit"
              class="edit-input"
              v-focus
            >
          </div>
          <div v-else class="view-mode">
            <span 
              class="task-text"
              @dblclick="todoStore.startEditing(task)"
            >{{ task.text }}</span>
          </div>
          
          <div class="task-actions">
            <button 
              v-if="todoStore.editingTaskId !== task.id"
              @click="todoStore.startEditing(task)" 
              class="edit-btn"
            >✏️</button>
            <button @click="todoStore.deleteTask(task.id)" class="delete-btn">×</button>
          </div>
        </div>
        
        <p v-if="todoStore.filteredTasks.length === 0" class="empty-message">
          Заметок нет... Нужно добавить.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const newTask = ref('')
const todoStore = useTodoStore()

const vFocus = {
  mounted: (el) => el.focus()
}

const addTask = () => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

:deep(.dark-theme) .todo-card {
  background: #2c3e50;
  color: #f0f0f0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
  font-weight: 700;
  transition: color 0.3s ease;
}

:deep(.dark-theme) h1 {
  color: #f0f0f0;
}

.controls {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.task-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
}

:deep(.dark-theme) .task-input {
  background: #34495e;
  border-color: #4a6572;
  color: #f0f0f0;
}

:deep(.dark-theme) .task-input::placeholder {
  color: #bdc3c7;
}

.task-input:focus {
  outline: none;
  border-color: #6C63FF;
}

.filter-select {
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  background: white;
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s ease;
}

:deep(.dark-theme) .filter-select {
  background: #34495e;
  border-color: #4a6572;
  color: #f0f0f0;
}

.tasks-list {
  margin-top: 2rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem;
  border-bottom: 1px solid #edf2f7;
  background: white;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

:deep(.dark-theme) .task-item {
  background: #34495e;
  border-bottom-color: #4a6572;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.task-item:hover {
  background: #f7fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

:deep(.dark-theme) .task-item:hover {
  background: #3d566e;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.task-item.completed {
  opacity: 0.7;
  background: #f0f0f0;
}

:deep(.dark-theme) .task-item.completed {
  background: #2a3b4d;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #6C63FF;
}

.view-mode {
  flex: 1;
}

.task-text {
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  color: #2d3748;
  font-weight: 500;
}

:deep(.dark-theme) .task-text {
  color: #f0f0f0;
}

.task-text:hover {
  background: #edf2f7;
}

:deep(.dark-theme) .task-text:hover {
  background: #4a6572;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #718096;
}

:deep(.dark-theme) .task-item.completed .task-text {
  color: #95a5a6;
}

.edit-mode {
  flex: 1;
}

.edit-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #6C63FF;
  border-radius: 8px;
  font-size: 1.1rem;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
}

:deep(.dark-theme) .edit-input {
  background: #34495e;
  border-color: #6C63FF;
  color: #f0f0f0;
}

.task-actions {
  display: flex;
  gap: 6px;
}

.edit-btn, .delete-btn {
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #ffd166;
  color: #2d3748;
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
  color: #718096;
  padding: 3rem;
  font-style: italic;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

:deep(.dark-theme) .empty-message {
  color: #bdc3c7;
}
</style>
