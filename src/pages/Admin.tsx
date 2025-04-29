
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentsTab } from '@/components/admin/AppointmentsTab';
import { BoatsTab } from '@/components/admin/BoatsTab';
import { AvailabilityTab } from '@/components/admin/AvailabilityTab';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-oceany-dark">
          Painel Administrativo
        </h1>
        
        <Tabs defaultValue="appointments">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="boats">Embarcações</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>
          
          <TabsContent value="boats">
            <BoatsTab />
          </TabsContent>
          
          <TabsContent value="availability">
            <AvailabilityTab />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
