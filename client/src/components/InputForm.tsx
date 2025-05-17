import React, { useState } from 'react';
import { FormData } from '../types';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    budget: '',
    environment: '',
    requiredStrength: '',
    durability: '',
    ecoFriendly: '',
    leadTime: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }
    
    if (!formData.environment) {
      newErrors.environment = 'Please select an environment';
    }
    
    if (!formData.requiredStrength) {
      newErrors.requiredStrength = 'Please select required strength';
    }
    
    if (!formData.durability || 
        isNaN(Number(formData.durability)) || 
        Number(formData.durability) < 1 || 
        Number(formData.durability) > 10) {
      newErrors.durability = 'Please enter a durability rating between 1-10';
    }
    
    if (!formData.ecoFriendly) {
      newErrors.ecoFriendly = 'Please specify if eco-friendly is required';
    }
    
    if (!formData.leadTime || 
        isNaN(Number(formData.leadTime)) || 
        Number(formData.leadTime) < 1 || 
        Number(formData.leadTime) > 45) {
      newErrors.leadTime = 'Please enter a lead time between 1-45 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user makes a change
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Budget */}
          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Project Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`block w-full pl-8 pr-3 py-2.5 rounded-lg border ${
                  errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
                placeholder="Enter budget amount"
              />
            </div>
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
              Environment
            </label>
            <select
              id="environment"
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className={`block w-full px-3 py-2.5 rounded-lg border ${
                errors.environment ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
            >
              <option value="" disabled>Select environment</option>
              <option value="Coastal">Coastal</option>
              <option value="Dry">Dry</option>
              <option value="Humid">Humid</option>
            </select>
            {errors.environment && <p className="text-red-500 text-xs mt-1">{errors.environment}</p>}
          </div>

          {/* Required Strength */}
          <div className="space-y-2">
            <label htmlFor="requiredStrength" className="block text-sm font-medium text-gray-700">
              Required Strength
            </label>
            <select
              id="requiredStrength"
              name="requiredStrength"
              value={formData.requiredStrength}
              onChange={handleChange}
              className={`block w-full px-3 py-2.5 rounded-lg border ${
                errors.requiredStrength ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
            >
              <option value="" disabled>Select strength</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.requiredStrength && <p className="text-red-500 text-xs mt-1">{errors.requiredStrength}</p>}
          </div>

          {/* Durability */}
          <div className="space-y-2">
            <label htmlFor="durability" className="block text-sm font-medium text-gray-700">
              Durability (1-9)
            </label>
            <input
              type="number"
              id="durability"
              name="durability"
              min="1"
              max="10"
              value={formData.durability}
              onChange={handleChange}
              className={`block w-full px-3 py-2.5 rounded-lg border ${
                errors.durability ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
              placeholder="Enter durability (1-9)"
            />
            {errors.durability && <p className="text-red-500 text-xs mt-1">{errors.durability}</p>}
          </div>

          {/* Eco-Friendly */}
          <div className="space-y-2">
            <label htmlFor="ecoFriendly" className="block text-sm font-medium text-gray-700">
              Eco-Friendly
            </label>
            <select
              id="ecoFriendly"
              name="ecoFriendly"
              value={formData.ecoFriendly}
              onChange={handleChange}
              className={`block w-full px-3 py-2.5 rounded-lg border ${
                errors.ecoFriendly ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
            >
              <option value="" disabled>Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.ecoFriendly && <p className="text-red-500 text-xs mt-1">{errors.ecoFriendly}</p>}
          </div>

          {/* Lead Time */}
          <div className="space-y-2">
            <label htmlFor="leadTime" className="block text-sm font-medium text-gray-700">
              Lead Time (≤ days)
            </label>
            <div className="relative">
              <input
                type="number"
                id="leadTime"
                name="leadTime"
                min="1"
                max="45"
                value={formData.leadTime}
                onChange={handleChange}
                className={`block w-full px-3 py-2.5 rounded-lg border ${
                  errors.leadTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } focus:border-blue-500 focus:ring-2 focus:ring-opacity-20 transition-all`}
                placeholder="Enter days (1-45)"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 pointer-events-none">
                days
              </span>
            </div>
            {errors.leadTime && <p className="text-red-500 text-xs mt-1">{errors.leadTime}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-6 py-3 mt-6 text-white font-medium rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Recommend Materials'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;