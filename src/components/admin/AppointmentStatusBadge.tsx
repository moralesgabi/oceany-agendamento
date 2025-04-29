
import React from 'react';
import { AppointmentStatus } from '@/types';

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const statusStyles = {
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    pending: 'Pendente'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
