import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <Balance />
                <IncomeExpenses />
              </div>
              <TransactionList />
            </div>
            <div>
              <div className="bg-white p-4 rounded shadow">
                <AddTransaction />
              </div>
            </div>
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;
