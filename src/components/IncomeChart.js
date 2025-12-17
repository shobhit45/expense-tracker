import React, { useMemo, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);

export const IncomeChart = ({ transactions }) => {
  const { transactions: allTransactions } = useContext(GlobalContext);
  const dataSource = transactions || allTransactions || [];

  const chartData = useMemo(() => {
    const sums = {};
    dataSource.forEach(t => {
      if (t.type === 'Income') {
        const key = t.category || 'General';
        sums[key] = (sums[key] || 0) + Number(t.amount || 0);
      }
    });
    const labels = Object.keys(sums);
    const data = labels.map(l => sums[l]);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => `hsl(${(i * 50) % 360} 70% 45%)`),
          hoverOffset: 8,
        },
      ],
    };
  }, [dataSource]);

  if (!chartData.labels || chartData.labels.length === 0) {
    return <div className="text-sm text-gray-500">No income data to show in chart.</div>;
  }

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">Income by Category</h4>
      <div className="w-full h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IncomeChart;
