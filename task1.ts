function formatInput(input: number): string;
function formatInput(input: string): string;
function formatInput(input: Date): string;

function formatInput(input: number | string | Date): string {
  switch (typeof input) {
    case 'number':
      return input.toFixed(2);
    case 'string':
      return input.toUpperCase();
    case 'object':
      if (input instanceof Date) {
        return `Дата: ${input.toISOString().split('T')[0]}`;
      }
    default:
      const exhaustiveCheck: never = input;
      throw new Error(exhaustiveCheck);
  }
}

console.log(formatInput(123.456));     
console.log(formatInput("hello world")); 
console.log(formatInput(new Date()));    