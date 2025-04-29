
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/booking';
import { toast } from '@/components/ui/use-toast';
import { TimeSlot } from '@/types';

export const useBookingForm = () => {
  const { boatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getBoat, 
    availabilityDays, 
    selectedDay, 
    setSelectedDay,
    selectedTimeSlotId,
    setSelectedTimeSlotId,
    createAppointment
  } = useBooking();

  const [boat, setBoat] = useState(getBoat(boatId || ''));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!boatId) {
      navigate('/embarcacoes');
      return;
    }

    const boatData = getBoat(boatId);
    if (!boatData) {
      navigate('/embarcacoes');
      return;
    }

    setBoat(boatData);
  }, [boatId, getBoat, navigate]);

  useEffect(() => {
    if (selectedDay && selectedTimeSlotId) {
      const timeSlot = selectedDay.timeSlots.find(slot => slot.id === selectedTimeSlotId);
      setSelectedTimeSlot(timeSlot || null);
    } else {
      setSelectedTimeSlot(null);
    }
  }, [selectedDay, selectedTimeSlotId]);

  const handleSelectDay = (day: typeof selectedDay) => {
    setSelectedDay(day);
    setSelectedTimeSlotId(null);
  };

  const handleSelectTimeSlot = (timeSlotId: string) => {
    setSelectedTimeSlotId(timeSlotId);
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Por favor, faça login para continuar com o agendamento.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!boat || !selectedDay || !selectedTimeSlotId) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um dia e horário disponível.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appointment = await createAppointment(
        user.id,
        boat.id,
        selectedDay.date,
        selectedTimeSlotId
      );

      // Encontrar o time slot escolhido
      const timeSlot = selectedDay.timeSlots.find(slot => slot.id === selectedTimeSlotId);
      
      if (!timeSlot) {
        throw new Error("Time slot not found");
      }

      // Formatar a data para exibição
      const formattedDate = format(parseISO(selectedDay.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

      // Criar a mensagem para o WhatsApp
      const message = encodeURIComponent(
        `Olá! Gostaria de confirmar meu agendamento:\n\n` +
        `Embarcação: ${boat.name}\n` +
        `Data: ${formattedDate}\n` +
        `Horário: ${timeSlot.startTime} - ${timeSlot.endTime}\n\n` +
        `Aguardo confirmação. Obrigado!`
      );

      // Redirecionar para o WhatsApp
      window.location.href = `https://wa.me/5511999999999?text=${message}`;
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer o agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    boat,
    availabilityDays,
    selectedDay,
    selectedTimeSlotId,
    selectedTimeSlot,
    isSubmitting,
    handleSelectDay,
    handleSelectTimeSlot,
    handleConfirmBooking
  };
};
