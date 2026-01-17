function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (chunkSize <= 0 || !Number.isInteger(chunkSize)) {
    throw new Error('chunkSize - положительное целое число');
  }

  const chunks: T[][] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  
  return chunks;
}


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const strings = ['a', 'b', 'c', 'd', 'e', 'f'];

console.log('Числа разбитые по 3:', chunkArray(numbers, 3));
console.log('Числа разбитые по 4:', chunkArray(numbers, 4));
console.log('Строки разбитые по 2:', chunkArray(strings, 2));

console.log('Пустой массив:', chunkArray([], 3));

const readonlyArray: readonly number[] = [1, 2, 3, 4, 5];
console.log('Readonly массив:', chunkArray(readonlyArray, 2));

try {
  chunkArray([1, 2, 3], -1);
} catch (error) {
  console.log('Ошибка chunkSize = -1:', (error as Error).message);
}