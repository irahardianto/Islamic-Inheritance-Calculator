
import React, { useState, useEffect } from 'react';
import { type FormData, Gender } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
  onReset: () => void;
}

interface NumberInputProps {
    inputId: string;
    label: string;
    value: number;
    onChange: (val: number) => void;
    disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ inputId, label, value, onChange, disabled }) => {
    const { t } = useAppContext();
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={inputId} className={`text-gray-700 ${disabled ? 'text-gray-400' : ''}`}>{label}</label>
            <div className="flex items-center space-x-2">
            <button
                type="button"
                onClick={() => onChange(Math.max(0, value - 1))}
                className="bg-gray-200 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                disabled={disabled}
                aria-label={t('decrementLabel', {label})}
            >
                -
            </button>
            <input
                id={inputId}
                type="number"
                value={value}
                onChange={(e) => onChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                disabled={disabled}
                min="0"
            />
            <button
                type="button"
                onClick={() => onChange(value + 1)}
                className="bg-gray-200 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                disabled={disabled}
                aria-label={t('incrementLabel', {label})}
            >
                +
            </button>
            </div>
        </div>
    );
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, onReset }) => {
  const { t, currency } = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    estate: 100000,
    deceasedGender: 'male',
    hasSpouse: true,
    hasFather: true,
    hasMother: true,
    sons: 1,
    daughters: 1,
    brothers: 0,
    sisters: 0,
  });
  
  const [isKalalah, setIsKalalah] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasChildren = formData.sons > 0 || formData.daughters > 0;
    const isKalalahCase = !hasChildren && !formData.hasFather;
    setIsKalalah(isKalalahCase);
    if (!isKalalahCase) {
        setFormData(prev => ({...prev, brothers: 0, sisters: 0}));
    }
  }, [formData.sons, formData.daughters, formData.hasFather]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.estate <= 0) {
        setError(t('analysis_positive_estate'));
        return;
    }
    setError(null);
    onCalculate(formData);
  };

  const handleResetClick = () => {
    setFormData({
      estate: 100000,
      deceasedGender: 'male',
      hasSpouse: true,
      hasFather: true,
      hasMother: true,
      sons: 1,
      daughters: 1,
      brothers: 0,
      sisters: 0,
    });
    setError(null);
    onReset();
  };
  
  const setEstateValue = (value: number) => {
      setFormData(prev => ({ ...prev, estate: value }));
      if (value > 0 && error) {
          setError(null);
      }
  }

  const setNumberValue = (field: keyof FormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: Math.max(0, value) }));
  }

  const setBooleanValue = (field: keyof FormData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }
  
  const currencySymbol = currency === 'USD' ? '$' : 'Rp';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">{t('deceasedAndEstate')}</h3>
        <div>
          <label htmlFor="estate-value" className="block text-sm font-medium text-gray-700 mb-1">{t('totalEstateValue')}</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
            </div>
            <input
              id="estate-value"
              type="number"
              value={formData.estate}
              onChange={(e) => setEstateValue(parseFloat(e.target.value) || 0)}
              className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 pl-7 ${error ? 'border-red-500' : ''}`}
              placeholder="100000"
              min="0"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">{t('deceasedGender')}</legend>
            <div className="flex space-x-4">
              {(['male', 'female'] as Gender[]).map(gender => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="deceasedGender"
                    value={gender}
                    checked={formData.deceasedGender === gender}
                    onChange={() => setFormData(prev => ({ ...prev, deceasedGender: gender }))}
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                  />
                  <span className="capitalize">{t(gender)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-teal-700 border-b pb-2">{t('survivingHeirs')}</h3>
        <div className="space-y-3 p-4 border rounded-md">
            <div className="flex items-center justify-between">
                <label htmlFor="hasSpouse" className="font-medium text-gray-700">{t('spouse')} ({t(formData.deceasedGender === 'male' ? 'wife' : 'husband')})</label>
                <input type="checkbox" id="hasSpouse" checked={formData.hasSpouse} onChange={(e) => setBooleanValue('hasSpouse', e.target.checked)} className="h-5 w-5 rounded text-teal-600 focus:ring-teal-500"/>
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="hasFather" className="font-medium text-gray-700">{t('father')}</label>
                <input type="checkbox" id="hasFather" checked={formData.hasFather} onChange={(e) => setBooleanValue('hasFather', e.target.checked)} className="h-5 w-5 rounded text-teal-600 focus:ring-teal-500"/>
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="hasMother" className="font-medium text-gray-700">{t('mother')}</label>
                <input type="checkbox" id="hasMother" checked={formData.hasMother} onChange={(e) => setBooleanValue('hasMother', e.target.checked)} className="h-5 w-5 rounded text-teal-600 focus:ring-teal-500"/>
            </div>
        </div>

        <div className="space-y-3 p-4 border rounded-md">
            <p className="font-medium text-gray-700">{t('children')}</p>
            <NumberInput inputId="sons-input" label={t('sons')} value={formData.sons} onChange={(val) => setNumberValue('sons', val)} />
            <NumberInput inputId="daughters-input" label={t('daughters')} value={formData.daughters} onChange={(val) => setNumberValue('daughters', val)} />
        </div>
        
        <div className={`space-y-3 p-4 border rounded-md transition-opacity duration-300 ${isKalalah ? 'opacity-100' : 'opacity-50 bg-gray-50'}`}>
            <p className="font-medium text-gray-700">{t('siblingsKalalah')}</p>
            <p className="text-xs text-gray-500">{t('kalalahDesc')}</p>
            <NumberInput inputId="brothers-input" label={t('brother')} value={formData.brothers} onChange={(val) => setNumberValue('brothers', val)} disabled={!isKalalah} />
            <NumberInput inputId="sisters-input" label={t('sister')} value={formData.sisters} onChange={(val) => setNumberValue('sisters', val)} disabled={!isKalalah} />
        </div>
      </div>

      <div className="flex space-x-4 pt-4 border-t">
        <button
          type="submit"
          className="w-full flex-1 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          {t('calculate')}
        </button>
        <button
          type="button"
          onClick={handleResetClick}
          className="w-full flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          {t('reset')}
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;