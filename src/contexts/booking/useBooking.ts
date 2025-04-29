
import { useContext } from 'react';
import { BookingContext } from './BookingContext';
import { BookingContextProps } from './types';

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking deve ser usado dentro de um BookingProvider');
  }
  return context as BookingContextProps;
};
