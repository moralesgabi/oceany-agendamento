
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { AppointmentStatus } from '@/types';

interface AppointmentActionsProps {
  appointmentId: string;
  status: AppointmentStatus;
  onStatusUpdate: (appointmentId: string, status: AppointmentStatus) => Promise<void>;
}

export function AppointmentActions({ appointmentId, status, onStatusUpdate }: AppointmentActionsProps) {
  const handleConfirmAppointment = async () => {
    try {
      await onStatusUpdate(appointmentId, 'confirmed');
      toast({
        title: "Agendamento confirmado",
        description: "O status do agendamento foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível confirmar o agendamento.",
        variant: "destructive",
      });
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await onStatusUpdate(appointmentId, 'cancelled');
      toast({
        title: "Agendamento cancelado",
        description: "O status do agendamento foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cancelar o agendamento.",
        variant: "destructive",
      });
    }
  };

  if (status !== 'pending') {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1"
        onClick={handleConfirmAppointment}
      >
        <Check className="w-4 h-4" />
        Confirmar
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1"
        onClick={handleCancelAppointment}
      >
        <X className="w-4 h-4" />
        Cancelar
      </Button>
    </div>
  );
}
