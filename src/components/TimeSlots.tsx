
import React from 'react';
import { cn } from '@/lib/utils';
import { TimeSlot } from '@/types';

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedTimeSlotId: string | null;
  onSelectTimeSlot: (id: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  timeSlots, 
  selectedTimeSlotId,
  onSelectTimeSlot 
}) => {
  // Separar os horários por período
  const morningSlots = timeSlots.filter(slot => slot.period === 'morning');
  const afternoonSlots = timeSlots.filter(slot => slot.period === 'afternoon');
  const fullDaySlots = timeSlots.filter(slot => slot.period === 'full');
  
  if (timeSlots.length === 0) {
    return (
      <div className="py-4 px-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Não há horários disponíveis para esta data.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6 space-y-6">
      {morningSlots.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-oceany-dark">Período da Manhã</h3>
          <div className="grid grid-cols-1 gap-3">
            {morningSlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                className={cn(
                  "py-3 px-4 border rounded-md cursor-pointer transition-colors",
                  selectedTimeSlotId === slot.id 
                    ? "border-oceany-dark bg-oceany-light text-oceany-dark font-medium" 
                    : "border-gray-200 hover:border-oceany-light"
                )}
              >
                {slot.startTime} - {slot.endTime} (4 horas)
              </div>
            ))}
          </div>
        </div>
      )}
      
      {afternoonSlots.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-oceany-dark">Período da Tarde</h3>
          <div className="grid grid-cols-1 gap-3">
            {afternoonSlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                className={cn(
                  "py-3 px-4 border rounded-md cursor-pointer transition-colors",
                  selectedTimeSlotId === slot.id 
                    ? "border-oceany-dark bg-oceany-light text-oceany-dark font-medium" 
                    : "border-gray-200 hover:border-oceany-light"
                )}
              >
                {slot.startTime} - {slot.endTime} (4 horas)
              </div>
            ))}
          </div>
        </div>
      )}
      
      {fullDaySlots.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-oceany-dark">Dia Inteiro</h3>
          <div className="grid grid-cols-1 gap-3">
            {fullDaySlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                className={cn(
                  "py-3 px-4 border rounded-md cursor-pointer transition-colors",
                  selectedTimeSlotId === slot.id 
                    ? "border-oceany-dark bg-oceany-light text-oceany-dark font-medium" 
                    : "border-gray-200 hover:border-oceany-light"
                )}
              >
                {slot.startTime} - {slot.endTime} (8 horas)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
