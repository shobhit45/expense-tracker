import React, { useContext, useState } from 'react';
import { Transaction } from './Transaction';
import CategoryChart from './CategoryChart';
import IncomeChart from './IncomeChart';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions, clearTransactions } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filtered = transactions.filter(t => {
    if (filterCategory !== 'All' && (t.category || 'General') !== filterCategory) return false;
    if (search && !String(t.text).toLowerCase().includes(search.toLowerCase())) return false;
    if (fromDate && t.date && t.date < fromDate) return false;
    if (toDate && t.date && t.date > toDate) return false;
    return true;
  });
  
  const exportCSV = () => {
    if (!transactions || transactions.length === 0) { alert('No transactions to export'); return; }
    const headers = ['id','text','amount','type','category','date'];
    const rows = filtered.map(t => [t.id, '"' + String(t.text).replace(/"/g,'""') + '"', t.amount, t.type || '', t.category || '', t.date || '']);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">History</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => exportCSV()} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm" disabled={transactions.length === 0}>Export CSV</button>
              <button onClick={() => clearTransactions()} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm" disabled={transactions.length === 0}>Clear All</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="px-3 py-1 border rounded text-sm" />
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-1 border rounded text-sm">
              <option>All</option>
              {[...new Set(transactions.map(t => t.category || 'General'))].map(c => (<option key={c}>{c}</option>))}
            </select>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-3 py-1 border rounded text-sm" />
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-3 py-1 border rounded text-sm" />
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && <div className="text-sm text-gray-500">No transactions match your filters.</div>}
            {filtered.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
          </div>

          <div className="mt-4 text-sm text-gray-600">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} shown ({transactions.length} total)</div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <CategoryChart transactions={filtered} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <IncomeChart transactions={filtered} />
          </div>
        </div>
      </div>
    </div>
  )
}
