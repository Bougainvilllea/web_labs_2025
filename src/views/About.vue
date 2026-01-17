<template>
  <div class="about">
    <div class="card">
      <h1>Немного о To-Do листе:</h1>
      
      <div class="features">
        <h2>Фичи:</h2>
        <ul>
          <li>🥟 Удаление/добавление задач</li>
          <li>🥟 Возможность пометки выполенного</li>
          <li>🥟 Фильтрация задач</li>
          <li>🥟 Аккаунт пользователя</li>
          <li>🥟 Хранение данных</li>
          <li>🥟 Тёмная тема</li>
        </ul>
      </div>
      
      <div class="tech">
        <h2>Выполенно при помощи:</h2>
        <p>Vue 3, Pinia, Vue Router</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

:deep(.dark-theme) .card {
  background: #2c3e50;
  color: #f8f9fa;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.features, .tech {
  margin: 25px 0;
}

h1 {
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
  transition: color 0.3s ease;
}

:deep(.dark-theme) h1 {
  color: #f0f0f0;
}

h2 {
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

:deep(.dark-theme) h2 {
  color: #e2e8f0;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin: 8px 0;
  color: #4a5568;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

:deep(.dark-theme) li {
  color: #e2e8f0;
}

p {
  color: #718096;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

:deep(.dark-theme) p {
  color: #bdc3c7;
}
</style>