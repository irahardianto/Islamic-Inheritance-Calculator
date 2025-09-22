import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type InheritanceResult, type HeirKey, Currency } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface ResultsDisplayProps {
  results: InheritanceResult | null;
  estate: number;
}

interface ChartDataItem {
    name: string;
    value: number;
    color: string;
    shareFraction: string;
    heirKey: HeirKey | 'unallocated';
    // Fix: Add index signature for compatibility with recharts' Pie component.
    [key: string]: any;
}

const formatCurrency = (amount: number, currency: Currency) => {
    const options = { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const locale = currency === 'IDR' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(amount);
};

const CustomTooltip: React.FC<any> = ({ active, payload, currency, t }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const heirName = data.heirKey ? t(data.heirKey) : data.name;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-sm">
        <p className="font-bold">{heirName}</p>
        <p>Amount: {formatCurrency(data.value, currency)}</p>
        <p>Share: {data.shareFraction}</p>
      </div>
    );
  }
  return null;
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, estate }) => {
  const { t, currency } = useAppContext();

  if (!results) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col items-center justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <h3 className="text-xl font-semibold text-gray-500">{t('awaitingCalculation')}</h3>
        <p className="text-gray-400 mt-2">{t('awaitingCalculationDesc')}</p>
      </div>
    );
  }

  const chartData: ChartDataItem[] = results.shares
    .filter(s => s.shareAmount > 0)
    .map(s => ({ name: t(s.heir), value: s.shareAmount, color: s.color, shareFraction: s.shareFraction, heirKey: s.heir }));
  
  if (results.unallocatedAmount > 0) {
      chartData.push({
          name: t('unallocated'),
          value: results.unallocatedAmount,
          shareFraction: t('unallocatedFraction'),
          color: '#a0aec0', // gray-400
          heirKey: 'unallocated'
      });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-teal-700 border-b pb-2">{t('inheritanceDistribution')}</h2>
            <p className="text-gray-600 mt-2">{t('forAnEstateOf')} <span className="font-bold">{formatCurrency(estate, currency)}</span></p>
        </div>

      <div className="h-64 md:h-80 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                  if (percent < 0.05) return null;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip currency={currency} t={t} />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('detailedShares')}</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('heir')}</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t('count')}</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('fractionalShare')}</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('amountPerPerson')}</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('totalAmount')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {results.shares.map((share, index) => share.shareAmount > 0 && (
                        <tr key={index}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                <span className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: share.color }}></span>
                                {t(share.heir)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{share.count}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{share.shareFraction}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 text-right">{formatCurrency(share.sharePerIndividual, currency)}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold text-right">{formatCurrency(share.shareAmount, currency)}</td>
                        </tr>
                    ))}
                    {results.unallocatedAmount > 0 && (
                         <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                <span className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: '#a0aec0' }}></span>
                                {t('unallocated')}
                            </td>
                             <td className="px-4 py-4">-</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{t('unallocatedFraction')}</td>
                            <td className="px-4 py-4">-</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold text-right">{formatCurrency(results.unallocatedAmount, currency)}</td>
                        </tr>
                    )}
                </tbody>
                 <tfoot className="bg-gray-50">
                    <tr>
                        <td colSpan={4} className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase">{t('totalDistributed')}</td>
                        <td className="px-4 py-3 text-right text-sm font-bold text-gray-700">{formatCurrency(results.totalDistributed, currency)}</td>
                    </tr>
                 </tfoot>
            </table>
        </div>
      </div>
      
      {results.analysis && (
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <p className="text-sm text-teal-800">{t(results.analysis.key, results.analysis.params)}</p>
        </div>
      )}

    </div>
  );
};

export default ResultsDisplay;