<template>
  <div id="app">
    <header>
      <h1>📝 To-Do</h1>
      <ThemeToggle />
    </header>
    <Todo />
  </div>
</template>

<script setup>
import Todo from './views/Todo.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style>
body {
  font-family: sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

body.dark-theme {
  background: linear-gradient(135deg, #2c6870ff, #34495e);
}

#app {
  max-width: 600px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: white;
  margin: 0;
}

body.dark-theme h1 {
  color: #f0f0f0;
}
</style>