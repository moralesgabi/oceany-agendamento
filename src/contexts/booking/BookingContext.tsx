
import React, { createContext, useState, useEffect } from 'react';
import { Boat, Appointment, AppointmentPeriod, AppointmentStatus, TimeSlot, AvailabilityDay } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { mockBoats, generateAvailabilityDays } from './mockData';
import { BookingContextProps } from './types';

export const BookingContext = createContext<BookingContextProps | null>(null);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boats, setBoats] = useState<Boat[]>(mockBoats);
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [selectedDay, setSelectedDay] = useState<AvailabilityDay | null>(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(null);

  useEffect(() => {
    // Carregar dados salvos do localStorage ou usar dados mock
    const savedBoats = localStorage.getItem('boats');
    const savedAvailabilityDays = localStorage.getItem('availabilityDays');
    const savedAppointments = localStorage.getItem('appointments');
    
    setBoats(savedBoats ? JSON.parse(savedBoats) : mockBoats);
    setAvailabilityDays(savedAvailabilityDays ? JSON.parse(savedAvailabilityDays) : generateAvailabilityDays());
    setAppointments(savedAppointments ? JSON.parse(savedAppointments) : []);
  }, []);

  // Salvar dados no localStorage quando eles mudarem
  useEffect(() => {
    localStorage.setItem('boats', JSON.stringify(boats));
  }, [boats]);

  useEffect(() => {
    localStorage.setItem('availabilityDays', JSON.stringify(availabilityDays));
  }, [availabilityDays]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const getBoat = (id: string) => {
    return boats.find(boat => boat.id === id);
  };

  const getAvailabilityDay = (date: string) => {
    return availabilityDays.find(day => day.date === date);
  };

  const createAppointment = async (userId: string, boatId: string, date: string, timeSlotId: string): Promise<Appointment> => {
    // Determine the period based on the timeSlotId
    const day = getAvailabilityDay(date);
    const timeSlot = day?.timeSlots.find(slot => slot.id === timeSlotId);
    
    if (!timeSlot) {
      throw new Error("Time slot not found");
    }
    
    const newAppointment: Appointment = {
      id: `appointment-${Date.now()}`,
      userId,
      boatId,
      date,
      period: timeSlot.period,
      status: 'pending',
      created: new Date()
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Atualizar disponibilidade do horário e dos períodos conflitantes
    setAvailabilityDays(prev => 
      prev.map(day => {
        if (day.date === date) {
          return {
            ...day,
            timeSlots: day.timeSlots.map(slot => {
              // Se for o período completo, desabilitar todos os horários
              if (timeSlot.period === 'full') {
                return { ...slot, available: false };
              }
              
              // Se for manhã ou tarde, desabilitar o slot selecionado e o período completo
              if (slot.id === timeSlotId || slot.period === 'full') {
                return { ...slot, available: false };
              }
              
              return slot;
            })
          };
        }
        return day;
      })
    );
    
    return newAppointment;
  };

  const getMyAppointments = (userId: string) => {
    return appointments.filter(app => app.userId === userId);
  };

  const updateBoat = (updatedBoat: Boat) => {
    setBoats(prev => 
      prev.map(boat => boat.id === updatedBoat.id ? updatedBoat : boat)
    );
  };

  const updateAvailability = (dayDate: string, isAvailable: boolean) => {
    setAvailabilityDays(prev => 
      prev.map(day => {
        if (day.date === dayDate) {
          return {
            ...day,
            available: isAvailable,
            timeSlots: day.timeSlots.map(slot => ({ ...slot, available: isAvailable }))
          };
        }
        return day;
      })
    );
  };

  const updateTimeSlotAvailability = (dayDate: string, timeSlotId: string, isAvailable: boolean) => {
    setAvailabilityDays(prev => 
      prev.map(day => {
        if (day.date === dayDate) {
          return {
            ...day,
            timeSlots: day.timeSlots.map(slot => 
              slot.id === timeSlotId ? { ...slot, available: isAvailable } : slot
            )
          };
        }
        return day;
      })
    );
  };

  const updateAppointmentStatus = async (appointmentId: string, status: AppointmentStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;

      // Atualizar appointments no estado
      setAppointments(prev => 
        prev.map(app => 
          app.id === appointmentId ? { ...app, status } : app
        )
      );

      return;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  };

  return (
    <BookingContext.Provider 
      value={{ 
        boats, 
        availabilityDays, 
        appointments, 
        selectedBoat,
        selectedDay,
        selectedTimeSlotId, 
        getBoat, 
        getAvailabilityDay,
        setSelectedBoat,
        setSelectedDay,
        setSelectedTimeSlotId,
        createAppointment, 
        getMyAppointments,
        updateBoat,
        updateAvailability,
        updateTimeSlotAvailability,
        updateAppointmentStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
