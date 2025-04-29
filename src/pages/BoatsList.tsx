
import React from 'react';
import { useBooking } from '@/contexts/booking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoatCard from '@/components/BoatCard';

const BoatsList = () => {
  const { boats } = useBooking();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-oceany-dark">
          Nossas Embarcações
        </h1>
        
        {boats.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              Não há embarcações disponíveis no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boats.map(boat => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BoatsList;
