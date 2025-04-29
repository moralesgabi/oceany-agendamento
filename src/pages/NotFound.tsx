
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold mb-4 text-oceany-dark">404</h1>
          <h2 className="text-2xl font-medium mb-6 text-oceany-dark">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Link to="/">
            <Button>Voltar para página inicial</Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
