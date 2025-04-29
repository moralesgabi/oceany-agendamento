
import React from 'react';
import Calendar from '@/components/Calendar';
import { AvailabilityDay } from '@/types';

interface DateSelectionProps {
  availabilityDays: AvailabilityDay[];
  selectedDay: AvailabilityDay | null;
  onSelectDay: (day: AvailabilityDay) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  availabilityDays,
  selectedDay,
  onSelectDay,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-oceany-dark">
        Selecione uma data
      </h2>
      <Calendar
        availableDays={availabilityDays}
        onSelectDay={onSelectDay}
        selectedDate={selectedDay?.date}
      />
    </div>
  );
};

export default DateSelection;
