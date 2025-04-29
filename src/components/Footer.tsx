import React from 'react';
const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className="text-white py-4 mt-auto bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {year} Oceany - Todos os direitos reservados
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-sm">
              Oceany - Diversão náutica com estilo
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
