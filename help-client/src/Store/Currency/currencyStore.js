import { create } from 'zustand';

export const useCurrencyStore = create((set) => ({
    currency: localStorage.getItem('currency') || 'USD', // Initialize with the value from localStorage or default to 'USD'
    setCurrency: (selectedCurrency) => {
        set({ currency: selectedCurrency });
        localStorage.setItem('currency', selectedCurrency); // Store the selected currency in localStorage
    },
}));