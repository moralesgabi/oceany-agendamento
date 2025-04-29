
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Boat } from '@/types';

interface BookingHeaderProps {
  boat: Boat;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ boat }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-oceany-dark">{boat.name}</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <img
          src={boat.imageUrl}
          alt={boat.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <p className="text-gray-700 mb-4">{boat.description}</p>
        </div>
      </div>
    </>
  );
};

export default BookingHeader;
