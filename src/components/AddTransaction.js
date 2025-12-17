import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [type, setType] = useState('Expense');

  const expenseCategories = ['General','Food','Transport','Entertainment','Utilities','Other'];
  const incomeCategories = ['General','Salary','Bonus','Investment','Other'];

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    // Basic validation
    if (text.trim() === '' || amount === '' || Number(amount) === 0) {
      alert('Please enter a description and a non-zero amount');
      return;
    }

    // store amount as positive and use `type` to distinguish income/expense
    const newTransaction = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      text: text.trim(),
      amount: Math.abs(Number(amount)),
      category,
      date,
      type
    }

    addTransaction(newTransaction);

    // Clear inputs
    setText('');
    setAmount(0);
    setCategory(type === 'Income' ? incomeCategories[0] : expenseCategories[0]);
    setDate(new Date().toISOString().slice(0,10));
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Add New Transaction</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." className="mt-1 block w-full rounded border-gray-200 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Amount</label>
          <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount (positive)..." className="mt-1 block w-full rounded border-gray-200 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Type</label>
          <select value={type} onChange={(e) => {
            const newType = e.target.value;
            setType(newType);
            // switch category list when type changes; pick first if current not in list
            const list = newType === 'Income' ? incomeCategories : expenseCategories;
            if (!list.includes(category)) setCategory(list[0]);
          }} className="mt-1 block w-full rounded border-gray-200 shadow-sm">
            <option>Expense</option>
            <option>Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded border-gray-200 shadow-sm">
            {(type === 'Income' ? incomeCategories : expenseCategories).map(c => (<option key={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full rounded border-gray-200 shadow-sm" />
        </div>
        <div>
          <button className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded">Add transaction</button>
        </div>
      </form>
    </div>
  )
}
