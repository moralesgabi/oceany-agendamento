import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
interface BookingConfirmationProps {
  isSubmitting: boolean;
  disabled: boolean;
  onConfirm: () => void;
}
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  isSubmitting,
  disabled,
  onConfirm
}) => {
  return <div className="mt-8 text-center">
      <Button onClick={onConfirm} disabled={disabled || isSubmitting} className="px-8 py-6 text-lg bg-gray-800 hover:bg-gray-700">
        {isSubmitting ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </> : 'Confirmar agendamento'}
      </Button>
      {disabled && <p className="mt-2 text-sm text-gray-500">
          Selecione uma data e horário para continuar
        </p>}
    </div>;
};
export default BookingConfirmation;