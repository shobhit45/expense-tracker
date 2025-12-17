import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  // calculate based on transaction.type field
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="p-3 bg-green-50 rounded">
        <h4 className="text-xs text-gray-600">Income</h4>
        <p className="text-lg font-semibold text-green-600">{moneyFormatter(income)}</p>
      </div>
      <div className="p-3 bg-red-50 rounded">
        <h4 className="text-xs text-gray-600">Expense</h4>
        <p className="text-lg font-semibold text-red-600">{moneyFormatter(expense)}</p>
      </div>
    </div>
  )
}
