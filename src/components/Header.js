import React from 'react'

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-brand-500 to-purple-600 text-white py-6 shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Expense Tracker</h1>
          <p className="text-sm opacity-90">Track income & expenses — fast, private, and responsive</p>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm bg-white/20 px-3 py-1 rounded">Local only • No account needed</span>
        </div>
      </div>
    </header>
  )
}
