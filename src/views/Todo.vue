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

          <div v-if="todoStore.editingTaskId === task.id" class="edit-mode">
            <input 
              v-model="todoStore.editText" 
              @keyup.enter="todoStore.saveEdit"
              @keyup.escape="todoStore.cancelEdit"
              @blur="todoStore.saveEdit"
              class="edit-input"
              ref="editInput"
              autofocus
            >
            <div class="edit-buttons">
              <button @click="todoStore.saveEdit" class="save-btn" title="Сохранить">✓</button>
              <button @click="todoStore.cancelEdit" class="cancel-btn" title="Отменить">✗</button>
            </div>
          </div>
          
          <div v-else class="view-mode">
            <input 
              type="checkbox" 
              :checked="task.completed"
              @change="todoStore.toggleTask(task.id)"
              class="task-checkbox"
            >
            <span class="task-text">
              {{ task.text }}
            </span>
            <div class="task-actions">
              <button 
                @click="startEditing(task)" 
                class="edit-btn"
                title="Редактировать"
              >
                ✏️
              </button>
              <button 
                @click="todoStore.deleteTask(task.id)" 
                class="delete-btn"
                title="Удалить"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        
        <p v-if="todoStore.filteredTasks.length === 0" class="empty-message">
          Заметок нет... Нужно добавить.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTodoStore } from '@/stores/todo'

const newTask = ref('')
const todoStore = useTodoStore()
const editInput = ref<HTMLInputElement | null>(null)

const addTask = (): void => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}

const startEditing = (task: any): void => {
  todoStore.startEditing(task)
  nextTick(() => {
    editInput.value?.focus()
    editInput.value?.select()
  })
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.dark-theme .todo-card {
  background: #2c3e50;
  color: #f0f0f0;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.dark-theme h1 {
  color: #f0f0f0;
}

.controls {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.task-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #333;
}

.dark-theme .task-input {
  background: #34495e;
  border-color: #4a6572;
  color: #f0f0f0;
}

.filter-select {
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #333;
}

.dark-theme .filter-select {
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
  padding: 1rem;
  border-bottom: 1px solid #f1f3f4;
  transition: background 0.3s ease;
  min-height: 60px;
}

.dark-theme .task-item {
  border-bottom: 1px solid #4a6572;
}

.task-item:hover {
  background: #f8f9fa;
}

.dark-theme .task-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.task-item.completed {
  opacity: 0.7;
}

/* Режим редактирования */
.edit-mode {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.edit-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #6C63FF;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  color: #333;
}

.dark-theme .edit-input {
  background: #34495e;
  border-color: #7b73ff;
  color: #f0f0f0;
}

.edit-buttons {
  display: flex;
  gap: 5px;
}

.save-btn, .cancel-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.save-btn {
  background: #4CAF50;
  color: white;
}

.save-btn:hover {
  background: #45a049;
}

.cancel-btn {
  background: #ff6b6b;
  color: white;
}

.cancel-btn:hover {
  background: #ff5252;
}

/* Обычный режим */
.view-mode {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
  padding: 5px 0;
  word-break: break-word;
}

.dark-theme .task-text {
  color: #f0f0f0;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  color: #888;
}

.dark-theme .task-item.completed .task-text {
  color: #aaa;
}

/* Кнопки действий */
.task-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.edit-btn, .delete-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.edit-btn {
  background: #FFC107;
  color: #333;
  font-size: 0.9rem;
}

.edit-btn:hover {
  background: #FFB300;
  transform: scale(1.1);
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  font-size: 1.2rem;
}

.delete-btn:hover {
  background: #ff5252;
  transform: scale(1.1);
}

.empty-message {
  text-align: center;
  color: #888;
  padding: 2rem;
  font-style: italic;
}

.dark-theme .empty-message {
  color: #aaa;
}
</style>
