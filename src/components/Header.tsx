import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
const Header = () => {
  const {
    user,
    logout
  } = useAuth();
  return <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/logo-oceany.png" alt="Oceany Logo" className="h-10 object-contain" />
        </Link>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/oceanybr" target="_blank" rel="noopener noreferrer" className="text-oceany-dark hover:text-oceany-blue transition-colors" aria-label="Instagram">
            <Instagram size={24} />
          </a>

          {user ? <div className="flex items-center gap-3">
              {user.isAdmin && <Link to="/admin">
                  <Button variant="outline">Painel Admin</Button>
                </Link>}
              <Link to="/meus-agendamentos">
                <Button variant="outline">Meus Agendamentos</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>Sair</Button>
            </div> : <Link to="/login">
              <Button className="bg-gray-900 hover:bg-gray-800">Entrar</Button>
            </Link>}
        </div>
      </div>
    </header>;
};
export default Header;
