
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Switch } from '@/components/ui/switch';
import { useBooking } from '@/contexts/booking';
import { AvailabilityDay } from '@/types';

export function AvailabilityTab() {
  const { 
    availabilityDays,
    updateAvailability,
    updateTimeSlotAvailability
  } = useBooking();

  const formatDayOfWeek = (dateStr: string) => {
    return format(parseISO(dateStr), "EEEE", { locale: ptBR });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-oceany-dark">
        Gerenciar Disponibilidade
      </h2>
      
      <div className="space-y-4">
        {availabilityDays.slice(0, 14).map((day: AvailabilityDay) => (
          <div key={day.date} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium">{format(parseISO(day.date), "dd/MM/yyyy")}</span>
                <span className="ml-2 text-gray-500 capitalize">{formatDayOfWeek(day.date)}</span>
              </div>
              <label className="flex items-center space-x-2">
                <Switch
                  checked={day.available}
                  onCheckedChange={(checked) => updateAvailability(day.date, checked)}
                />
                <span>{day.available ? 'Disponível' : 'Indisponível'}</span>
              </label>
            </div>
            
            {day.available && (
              <div className="pl-4 space-y-2">
                <h3 className="text-sm font-medium mb-1">Horários:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {day.timeSlots.map(slot => (
                    <div key={slot.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{slot.startTime} - {slot.endTime}</span>
                      <Switch
                        checked={slot.available}
                        onCheckedChange={(checked) => 
                          updateTimeSlotAvailability(day.date, slot.id, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
