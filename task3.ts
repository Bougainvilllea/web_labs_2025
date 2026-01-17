type UserId = string & { readonly brand: unique symbol };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}

function createUserId(id: string): UserId {
  if (!isUserId(id)) {
    throw new Error(`Неверный формат UUID: ${id}`);
  }
  return id as UserId;
}

function getUserProfile(id: UserId): { id: UserId; name: string; email: string } {
  return {
    id,
    name: 'Иван Иванов',
    email: 'ivan@example.com'
  };
}

const validId = createUserId('550e8400-e29b-41d4-a716-446655440000');
console.log('Валидный ID:', validId);

try {
  const invalidId = createUserId('invalid-id');
} catch (error) {
  console.log('Ошибка: невалидный ID:', (error as Error).message);
}

const profile = getUserProfile(validId);
console.log('Профиль пользователя:', profile);