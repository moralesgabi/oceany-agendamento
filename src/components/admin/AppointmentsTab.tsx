
import React from 'react';
import { useBooking } from '@/contexts/booking';
import { AppointmentList } from './AppointmentList';

export function AppointmentsTab() {
  const { appointments, updateAppointmentStatus } = useBooking();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-oceany-dark">
        Gerenciar Agendamentos
      </h2>
      <AppointmentList
        appointments={appointments}
        onUpdateStatus={updateAppointmentStatus}
      />
    </div>
  );
}
