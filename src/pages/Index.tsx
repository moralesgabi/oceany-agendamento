import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/booking';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoatCard from '@/components/BoatCard';
import { Button } from '@/components/ui/button';
const Index = () => {
  const {
    user
  } = useAuth();
  const {
    boats
  } = useBooking();
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="p-8 mb-10 flex flex-col md:flex-row items-center rounded-lg bg-slate-50">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-oceany-dark">
              Diversão Náutica ao seu Alcance
            </h1>
            <p className="text-gray-700 mb-6">
              Agende facilmente sua embarcação e aproveite o melhor do mar com a Oceany.
              Experiências inesquecíveis estão a apenas alguns cliques de distância.
            </p>
            {!user ? <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800">Entrar com seu celular</Button>
                </Link>
                <Link to="/embarcacoes">
                  <Button variant="outline" className="w-full sm:w-auto">Ver embarcações</Button>
                </Link>
              </div> : <Link to="/embarcacoes">
                <Button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700">Ver embarcações disponíveis</Button>
              </Link>}
          </div>
          <div className="md:w-1/2 md:pl-8">
            
          </div>
        </div>

        {/* Boats Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-oceany-dark">
              Embarcações Disponíveis
            </h2>
            <Link to="/embarcacoes">
              <Button variant="outline">Ver todas</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boats.slice(0, 3).map(boat => <BoatCard key={boat.id} boat={boat} />)}
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-oceany-dark">
            Como Funciona
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-oceany-light text-oceany-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Escolha sua Embarcação</h3>
              <p className="text-gray-600">
                Selecione entre nossas opções de embarcações disponíveis para o seu passeio.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-oceany-light text-oceany-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">Selecione a Data e Horário</h3>
              <p className="text-gray-600">
                Escolha o melhor dia e horário para sua aventura náutica.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-oceany-light text-oceany-dark w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Confirme via WhatsApp</h3>
              <p className="text-gray-600">
                Finalize seu agendamento através do WhatsApp e prepare-se para a diversão.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Index;