import React, {useContext} from 'react';
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

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const { editTransaction } = useContext(GlobalContext);

  const sign = transaction.type === 'Expense' ? '-' : '+';

  return (
    <div className={`w-full bg-white p-4 rounded shadow border-l-4 ${transaction.type === 'Expense' ? 'border-red-400' : 'border-green-400'}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{transaction.text}</div>
          <div className="text-xs text-gray-500">{transaction.category || 'General'} • {transaction.date || ''}</div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-semibold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'}`}>{sign}{moneyFormatter(transaction.amount)}</div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <button onClick={() => {
              const newText = prompt('Edit description', transaction.text);
              if (newText === null) return;
              const newAmountRaw = prompt('Edit amount (positive number)', transaction.amount);
              if (newAmountRaw === null) return;
              const newType = prompt('Type (Income or Expense)', transaction.type || 'Expense');
              if (newType === null) return;
              const newCategory = prompt('Edit category', transaction.category || 'General');
              if (newCategory === null) return;
              const newDate = prompt('Edit date (YYYY-MM-DD)', transaction.date || new Date().toISOString().slice(0,10));
              if (newDate === null) return;
              const newAmount = Number(newAmountRaw);
              if (isNaN(newAmount) || newAmount === 0) { alert('Amount must be a non-zero number'); return; }
              editTransaction({ ...transaction, text: newText.trim(), amount: Math.abs(newAmount), category: newCategory, date: newDate, type: (String(newType).toLowerCase().startsWith('i') ? 'Income' : 'Expense') });
            }} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
            <button onClick={() => deleteTransaction(transaction.id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
