
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/booking';
import { Boat } from '@/types';

export function BoatsTab() {
  const { boats, updateBoat } = useBooking();
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [boatName, setBoatName] = useState('');
  const [boatDescription, setBoatDescription] = useState('');
  const [boatAvailable, setBoatAvailable] = useState(true);

  React.useEffect(() => {
    if (boats.length > 0 && !selectedBoat) {
      const boat = boats[0];
      setSelectedBoat(boat);
      setBoatName(boat.name);
      setBoatDescription(boat.description);
      setBoatAvailable(boat.available);
    }
  }, [boats, selectedBoat]);

  const handleSaveBoat = () => {
    if (!selectedBoat) return;
    
    const updatedBoat: Boat = {
      ...selectedBoat,
      name: boatName,
      description: boatDescription,
      available: boatAvailable
    };
    
    updateBoat(updatedBoat);
    toast({
      title: "Sucesso",
      description: "Informações da embarcação atualizadas.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-oceany-dark">
        Gerenciar Embarcações
      </h2>
      
      {selectedBoat && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da embarcação
            </label>
            <Input
              value={boatName}
              onChange={(e) => setBoatName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <Textarea
              value={boatDescription}
              onChange={(e) => setBoatDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <Switch
                checked={boatAvailable}
                onCheckedChange={setBoatAvailable}
              />
              <span>Disponível para agendamento</span>
            </label>
          </div>
          
          <div>
            <Button onClick={handleSaveBoat}>
              Salvar alterações
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
