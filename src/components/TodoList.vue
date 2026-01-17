<template>
  <div class="todo-container">
    <div class="todo-card">
      <h1>Мои задачи</h1>
      
      <div class="controls">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Введите задачу и нажмите Enter"
          class="task-input"
        >
        
        <div class="controls-right">
          <SearchBar @search="handleSearch" />
          <select v-model="todoStore.filter" class="filter-select">
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="completed">Завершенные</option>
          </select>
        </div>
      </div>
      
      <TodoList :tasks="filteredAndSearchedTasks" :empty-message="emptyMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todo'
import TodoList from '../components/TodoList.vue'
import SearchBar from '../components/SearchBar.vue'

const newTask = ref('')
const searchQuery = ref('')
const todoStore = useTodoStore()

const filteredAndSearchedTasks = computed(() => {
  let tasks = todoStore.filteredTasks
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    tasks = tasks.filter(task => task.text.toLowerCase().includes(query))
  }
  return tasks
})

const emptyMessage = computed(() => {
  if (searchQuery.value.trim()) return 'Ничего не найдено'
  return 'Задач пока нет'
})

const addTask = () => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.todo-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.task-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.controls-right {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>