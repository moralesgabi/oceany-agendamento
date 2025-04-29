import React from 'react';
import { Button } from '@/components/ui/button';
import { Boat } from '@/types';
import { Link } from 'react-router-dom';
interface BoatCardProps {
  boat: Boat;
}
const BoatCard: React.FC<BoatCardProps> = ({
  boat
}) => {
  return <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={boat.imageUrl} alt={boat.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-medium mb-2">{boat.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{boat.description}</p>
        
        {boat.available ? <Link to={`/agendar/${boat.id}`}>
            <Button className="w-full bg-gray-800 hover:bg-gray-700">Agendar</Button>
          </Link> : <Button className="w-full" disabled>
            Indisponível
          </Button>}
      </div>
    </div>;
};
export default BoatCard;