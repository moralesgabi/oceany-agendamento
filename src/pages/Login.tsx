import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneInput from '@/components/PhoneInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
const Login = () => {
  const {
    login,
    adminLogin
  } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmittingAdmin, setIsSubmittingAdmin] = useState(false);
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length !== 11) {
      toast({
        title: "Erro",
        description: "Por favor, insira um número de celular válido.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await login(phone);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso."
      });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) {
      toast({
        title: "Erro",
        description: "Por favor, insira a senha de administrador.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmittingAdmin(true);
    try {
      const success = await adminLogin(adminPassword);
      if (success) {
        toast({
          title: "Sucesso",
          description: "Login administrativo realizado com sucesso."
        });
        navigate('/admin');
      } else {
        toast({
          title: "Erro",
          description: "Senha incorreta. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingAdmin(false);
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center text-oceany-dark">
            Acesse sua conta
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <Tabs defaultValue="user">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">Cliente</TabsTrigger>
                <TabsTrigger value="admin">Administrador</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="mt-4">
                <form onSubmit={handleUserLogin}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de celular
                      </label>
                      <PhoneInput value={phone} onChange={setPhone} disabled={isSubmitting} />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gray-800 hover:bg-gray-700">
                      {isSubmitting ? 'Aguarde...' : 'Entrar'}
                    </Button>
                    
                    <p className="text-sm text-center text-gray-500">
                      Utilize seu número de celular para acessar o sistema. Não é necessário cadastro prévio.
                    </p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="admin" className="mt-4">
                <form onSubmit={handleAdminLogin}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha de Administrador
                      </label>
                      <Input id="password" type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} disabled={isSubmittingAdmin} />
                    </div>
                    
                    <Button type="submit" disabled={isSubmittingAdmin} className="w-full bg-gray-800 hover:bg-gray-700">
                      {isSubmittingAdmin ? 'Aguarde...' : 'Entrar como Administrador'}
                    </Button>
                    
                    <p className="text-sm text-center text-gray-500">
                      Área restrita para administradores do sistema.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Login;