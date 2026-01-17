function applyPipeline<T>(value: T, ...fns: Array<(arg: any) => any>): unknown {
  return fns.reduce((acc, fn) => fn(acc), value);
}

const square = (x: number): number => x * x;
const toString = (x: number): string => x.toString();
const formatResult = (x: string): string => `Результат: ${x}`;

const roundToTwo = (x: number): number => Math.round(x * 100) / 100;

const addUnits = (x: string): string => `${x} единиц`;

const result1 = applyPipeline(5, square, roundToTwo, toString, formatResult);
console.log('1:', result1);

const result2 = applyPipeline(3, square, toString, addUnits, formatResult);
console.log('2:', result2);

const customPipeline = applyPipeline(
  10,
  (x: number) => x / 2,
  (x: number) => x + 10,
  (x: number) => x * x,
  toString,
  formatResult
);
console.log('3:', customPipeline); 