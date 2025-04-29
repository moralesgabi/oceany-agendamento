
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths, isSameMonth, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AvailabilityDay } from '@/types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  availableDays: AvailabilityDay[];
  onSelectDay: (day: AvailabilityDay) => void;
  selectedDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({ availableDays, onSelectDay, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Gerar dias do mês atual
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Determinar o primeiro dia da semana (0 = Domingo, 6 = Sábado)
  const startDay = getDay(monthStart);
  
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const handleSelectDay = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const day = availableDays.find(d => d.date === dateString);
    if (day && day.available) {
      onSelectDay(day);
    }
  };
  
  // Verificar se um dia está disponível
  const isDayAvailable = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const day = availableDays.find(d => d.date === dateString);
    return day ? day.available : false;
  };
  
  // Verificar se um dia está selecionado
  const isSelectedDay = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return dateString === selectedDate;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-oceany-dark" />
          <h2 className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Dias da semana */}
        {daysOfWeek.map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Dias vazios do início do mês */}
        {Array(startDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}
        
        {/* Dias do mês */}
        {monthDays.map(day => {
          const dayAvailable = isDayAvailable(day);
          const isSelected = isSelectedDay(day);
          const isPastDay = day < new Date();
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={day.toISOString()}
              onClick={() => !isPastDay && dayAvailable && handleSelectDay(day)}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full mx-auto cursor-pointer",
                dayAvailable && !isPastDay ? "hover:bg-oceany-light hover:text-oceany-dark" : "cursor-not-allowed opacity-50",
                isSelected && "bg-oceany-dark text-white",
                !isCurrentMonth && "text-gray-300",
                "transition-colors"
              )}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
