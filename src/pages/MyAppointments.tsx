
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/booking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentCard from '@/components/AppointmentCard';
import { Appointment, Boat, TimeSlot } from '@/types';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMyAppointments, getBoat, getAvailabilityDay } = useBooking();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [boatMap, setBoatMap] = useState<{ [key: string]: Boat }>({});
  const [timeSlotMap, setTimeSlotMap] = useState<{ [key: string]: TimeSlot }>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const userAppointments = getMyAppointments(user.id);
    
    const boatsMap: { [key: string]: Boat } = {};
    const timeSlotsMap: { [key: string]: TimeSlot } = {};
    
    userAppointments.forEach(appointment => {
      if (!boatsMap[appointment.boatId]) {
        const boat = getBoat(appointment.boatId);
        if (boat) {
          boatsMap[appointment.boatId] = boat;
        }
      }
      
      const key = `${appointment.date}-${appointment.period}`;
      if (!timeSlotsMap[key]) {
        const day = getAvailabilityDay(appointment.date);
        if (day) {
          // Find appropriate time slot based on period
          const timeSlot = day.timeSlots.find(slot => {
            if (appointment.period === 'morning') return slot.startTime === '09:00';
            if (appointment.period === 'afternoon') return slot.startTime === '13:00';
            return slot.startTime === '09:00'; // full day
          });
          if (timeSlot) {
            timeSlotsMap[key] = timeSlot;
          }
        }
      }
    });
    
    setAppointments(userAppointments);
    setBoatMap(boatsMap);
    setTimeSlotMap(timeSlotsMap);
  }, [user, getMyAppointments, getBoat, getAvailabilityDay, navigate]);

  const getTimeSlot = (appointment: Appointment): TimeSlot | undefined => {
    const key = `${appointment.date}-${appointment.period}`;
    return timeSlotMap[key];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-oceany-dark">
          Meus Agendamentos
        </h1>
        
        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              Você ainda não possui nenhum agendamento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map(appointment => {
              const boat = boatMap[appointment.boatId];
              const timeSlot = getTimeSlot(appointment);
              
              if (!boat || !timeSlot) {
                return null;
              }
              
              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  boat={boat}
                  timeSlot={timeSlot}
                />
              );
            })}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAppointments;
