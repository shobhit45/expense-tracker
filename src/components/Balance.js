import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' + (p[0].split('')[0]=== '-' ? '-' : '') +
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

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const total = income - expense;

  return (
    <div className="text-center">
      <h4 className="text-sm text-gray-500">Your Balance</h4>
      <h1 className="text-3xl font-bold mt-2">{moneyFormatter(total)}</h1>
    </div>
  )
}
