type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? T[P] extends Function 
      ? T[P] 
      : DeepReadonly<T[P]>
    : T[P];
};

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  Object.freeze(obj);
  
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = (obj as any)[prop];
    
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  
  return obj as DeepReadonly<T>;
}


const complexObject = {
  name: 'Объект',
  count: 42,
  nested: {
    array: [1, 2, 3, { deeper: 'значение' }],
    object: {
      prop1: 'test',
      prop2: 123
    }
  },
  method() {
    return this.name;
  }
};

const frozenObject = deepFreeze(complexObject);

console.log('Исходный объект:', complexObject);
console.log('Замороженный объект:', frozenObject);

try {
  // @ts-expect-error - специально вызываем ошибку для демонстрации
  frozenObject.name = 'Изменено';
  console.log('Имя изменено'); // Этот код не выполнится
} catch (error) {
  console.log('Ошибка при изменении frozenObject.name:', (error as Error).message);
}

try {
  // @ts-expect-error - специально вызываем ошибку для демонстрации
  frozenObject.nested.array.push(4);
  console.log('Массив изменен');
} catch (error) {
  console.log('Ошибка при изменении nested.array:', (error as Error).message);
}

console.log('Вызов метода:', frozenObject.method());

console.log('Исходный объект не изменился:', complexObject.name === 'Объект');