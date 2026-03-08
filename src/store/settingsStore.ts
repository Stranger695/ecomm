import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  currency: string;
  currencySymbol: string;
  currencyPosition: 'left' | 'right';
  theme: 'light' | 'dark';
  setCurrency: (currency: string, symbol: string) => void;
  setCurrencyPosition: (position: 'left' | 'right') => void;
  toggleTheme: () => void;
  formatCurrency: (value: number | string) => string;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      currencySymbol: '$',
      currencyPosition: 'left',
      theme: 'light',
      setCurrency: (currency, currencySymbol) => set({ currency, currencySymbol }),
      setCurrencyPosition: (currencyPosition) => set({ currencyPosition }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      formatCurrency: (value) => {
        const { currencySymbol, currencyPosition } = get();
        return currencyPosition === 'left' 
          ? `${currencySymbol}${value}` 
          : `${value}${currencySymbol}`;
      },
    }),
    {
      name: 'nexus-settings',
    }
  )
);
