type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "free";
};

type StatusSummary = {
  paid: number;
  free: number;
};

function sumByStatus(invoices: readonly Invoice[]): StatusSummary {
  return invoices.reduce((acc: StatusSummary, invoice) => {
    if (invoice.status === "paid") {
      acc.paid += invoice.amount;
    } else if (invoice.status === "free") {
      acc.free += invoice.amount;
    }
    return acc;
  }, { paid: 0, free: 0 });
}


const invoices: readonly Invoice[] = [
  { id: '1', amount: 100, status: 'paid' },
  { id: '2', amount: 200, status: 'paid' },
  { id: '3', amount: 50, status: 'free' },
  { id: '4', amount: 300, status: 'paid' },
  { id: '5', amount: 75, status: 'free' },
];

const summary = sumByStatus(invoices);
console.log('Сводка по счетам:');
console.log('Оплачено:', summary.paid);
console.log('Бесплатно:', summary.free);
console.log('Общая сумма:', summary.paid + summary.free);

console.log('Исходный массив не изменился:', invoices);