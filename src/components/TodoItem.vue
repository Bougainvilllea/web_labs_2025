<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <input 
      type="checkbox" 
      :checked="task.completed"
      @change="toggleTask"
      class="task-checkbox"
    >
    
    <div v-if="isEditing" class="edit-mode">
      <input 
        ref="editInputRef"
        v-model="editText" 
        @keydown="handleKeydown"
        @blur="handleBlur"
        class="edit-input"
      >
    </div>
    <div v-else class="view-mode">
      <span 
        class="task-text"
        @dblclick="startEditing"
      >{{ task.text }}</span>
    </div>
    
    <div class="task-actions">
      <button 
        v-if="!isEditing"
        @click="startEditing" 
        class="edit-btn"
        title="Редактировать"
      >✏️</button>
      <button @click="deleteTask" class="delete-btn" title="Удалить">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useTodoStore } from '../stores/todo'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const todoStore = useTodoStore()

const isEditing = ref(false)
const editText = ref('')
const editInputRef = ref(null)

const startEditing = () => {
  isEditing.value = true
  editText.value = props.task.text
  nextTick(() => {
    if (editInputRef.value) {
      editInputRef.value.focus()
      editInputRef.value.select()
    }
  })
}

const saveEdit = () => {
  if (editText.value.trim()) {
    todoStore.editTask(props.task.id, editText.value.trim())
  }
  isEditing.value = false
}

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    saveEdit()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    isEditing.value = false
  }
}

const handleBlur = () => {
  setTimeout(() => {
    if (isEditing.value) {
      saveEdit()
    }
  }, 100)
}

const toggleTask = () => {
  todoStore.toggleTask(props.task.id)
}

const deleteTask = () => {
  todoStore.deleteTask(props.task.id)
}
</script>

<style scoped lang="scss">
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

  &:hover {
    background: #f7fafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  &.completed {
    opacity: 0.7;
    background: #f0f0f0;
    
    .task-text {
      text-decoration: line-through;
      color: #718096;
    }
  }
}

:deep(.dark-theme) .task-item {
  background: #34495e;
  border-bottom-color: #4a6572;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  &:hover {
    background: #3d566e;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  &.completed {
    background: #2a3b4d;
    
    .task-text {
      color: #95a5a6;
    }
  }
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

  &:hover {
    background: #edf2f7;
  }
}

:deep(.dark-theme) .task-text {
  color: #f0f0f0;

  &:hover {
    background: #4a6572;
  }
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

  &:focus {
    outline: none;
  }
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

  &:hover {
    transform: scale(1.05);
  }
}

.edit-btn {
  background: #ffd166;
  color: #2d3748;

  &:hover {
    background: #ffc847;
  }
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  font-weight: bold;

  &:hover {
    background: #ff5252;
  }
}
</style>