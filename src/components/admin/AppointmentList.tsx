
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Appointment } from '@/types';
import { AppointmentActions } from './AppointmentActions';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface AppointmentListProps {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, status: Appointment['status']) => Promise<void>;
}

export function AppointmentList({ appointments, onUpdateStatus }: AppointmentListProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {format(parseISO(appointment.date), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                {appointment.period === 'morning' ? 'Manhã' :
                 appointment.period === 'afternoon' ? 'Tarde' : 'Dia Inteiro'}
              </TableCell>
              <TableCell>{appointment.userId}</TableCell>
              <TableCell>
                <AppointmentStatusBadge status={appointment.status} />
              </TableCell>
              <TableCell>
                <AppointmentActions
                  appointmentId={appointment.id}
                  status={appointment.status}
                  onStatusUpdate={onUpdateStatus}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
