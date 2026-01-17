<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Поиск задач..."
      class="search-input"
      @input="handleSearch"
    >
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value)
}

watch(searchQuery, (newQuery) => {
  emit('search', newQuery)
})
</script>

<style scoped lang="scss">
.search-bar {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6C63FF;
  }
}

:deep(.dark-theme) .search-input {
  background: #34495e;
  border-color: #4a6572;
  color: #f0f0f0;

  &::placeholder {
    color: #bdc3c7;
  }
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  pointer-events: none;
}

:deep(.dark-theme) .search-icon {
  color: #bdc3c7;
}
</style>