
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TimeSlots from '@/components/TimeSlots';
import { AvailabilityDay } from '@/types';

interface TimeSelectionProps {
  selectedDay: AvailabilityDay | null;
  selectedTimeSlotId: string | null;
  onSelectTimeSlot: (timeSlotId: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedDay,
  selectedTimeSlotId,
  onSelectTimeSlot,
}) => {
  if (!selectedDay) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Selecione uma data para ver os horários disponíveis.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-oceany-dark">
        Horários disponíveis para {format(parseISO(selectedDay.date), "dd 'de' MMMM", { locale: ptBR })}
      </h2>
      <TimeSlots
        timeSlots={selectedDay.timeSlots.filter(slot => slot.available)}
        selectedTimeSlotId={selectedTimeSlotId}
        onSelectTimeSlot={onSelectTimeSlot}
      />
    </>
  );
};

export default TimeSelection;
