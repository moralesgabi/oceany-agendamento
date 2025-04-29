
import { Boat, AvailabilityDay, AppointmentPeriod } from '@/types';
import { addDays } from 'date-fns';

// Dados mock para o MVP
export const mockBoats: Boat[] = [
  {
    id: 'jetski-1',
    name: 'Jetski Sea-Doo',
    description: 'Jetski modelo Sea-Doo para até 2 pessoas. Ideal para passeios rápidos e aventuras emocionantes.',
    imageUrl: '/lovable-uploads/00b458d2-7af1-4edf-a525-c58008978c82.png',
    available: true
  }
];

// Gerar dias disponíveis para os próximos 30 dias
export const generateAvailabilityDays = () => {
  const days: AvailabilityDay[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = addDays(today, i);
    const available = date.getDay() !== 0; // Não disponibilizar em domingos
    
    const timeSlots = [
      { id: `morning-${i}`, startTime: '09:30', endTime: '13:30', available, period: 'morning' as AppointmentPeriod },
      { id: `afternoon-${i}`, startTime: '13:30', endTime: '17:30', available, period: 'afternoon' as AppointmentPeriod },
      { id: `full-${i}`, startTime: '09:30', endTime: '17:30', available, period: 'full' as AppointmentPeriod },
    ];
    
    days.push({
      date: date.toISOString().split('T')[0],
      available,
      timeSlots
    });
  }
  
  return days;
};
