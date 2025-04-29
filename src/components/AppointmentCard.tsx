import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { Appointment, Boat, TimeSlot } from '@/types';
import { Button } from '@/components/ui/button';
interface AppointmentCardProps {
  appointment: Appointment;
  boat: Boat;
  timeSlot: TimeSlot;
}
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  boat,
  timeSlot
}) => {
  const formatDate = (dateStr: string) => {
    return format(parseISO(dateStr), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    });
  };
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado'
  };
  const createWhatsAppLink = () => {
    const message = encodeURIComponent(`Olá! Gostaria de confirmar meu agendamento:\n\n` + `Embarcação: ${boat.name}\n` + `Data: ${formatDate(appointment.date)}\n` + `Horário: ${timeSlot.startTime} - ${timeSlot.endTime}\n\n` + `Aguardo confirmação. Obrigado!`);
    return `https://wa.me/5547996988775?text=${message}`;
  };
  return <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Calendar className="h-5 w-5 text-oceany-blue mr-2" />
          <h3 className="text-lg font-medium">{boat.name}</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-600">
            <span className="font-medium">Data:</span> {formatDate(appointment.date)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Horário:</span> {timeSlot.startTime} - {timeSlot.endTime}
          </p>
          <div className="flex items-center">
            <span className="font-medium text-gray-600 mr-2">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[appointment.status]}`}>
              {statusLabels[appointment.status]}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between">
          {appointment.status === 'pending' && <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-cyan-950 hover:bg-cyan-800">Confirmar via WhatsApp</Button>
            </a>}
          {appointment.status === 'confirmed' && <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full">Enviar Mensagem</Button>
            </a>}
        </div>
      </div>
    </div>;
};
export default AppointmentCard;
