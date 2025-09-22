
import React, { useState } from 'react';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import QuranicReference from './components/QuranicReference';
import { type FormData, type InheritanceResult } from './types';
import { calculateInheritance } from './services/inheritanceCalculator';
import { AppProvider, useAppContext } from './contexts/AppContext';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const [results, setResults] = useState<InheritanceResult | null>(null);
  const [estateValue, setEstateValue] = useState<number>(0);
  const { t } = useAppContext();

  const handleCalculate = (data: FormData) => {
    const calculatedResults = calculateInheritance(data);
    setResults(calculatedResults);
    setEstateValue(data.estate);
  };

  const handleReset = () => {
    setResults(null);
    setEstateValue(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay results={results} estate={estateValue} />
          </div>
        </div>
        <div className="mt-12">
          <QuranicReference />
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>{t('disclaimer')}</p>
        <p>{t('copyright')}</p>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AppProvider>
  );
};


export default App;