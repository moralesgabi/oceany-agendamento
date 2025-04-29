
import React from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNumber = e.target.value.replace(/\D/g, '');
    
    if (phoneNumber.length > 11) {
      phoneNumber = phoneNumber.substring(0, 11);
    }
    
    if (phoneNumber.length > 0) {
      // Formatação para (xx) xxxxx-xxxx
      if (phoneNumber.length <= 2) {
        phoneNumber = `(${phoneNumber}`;
      } else if (phoneNumber.length <= 7) {
        phoneNumber = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;
      } else {
        phoneNumber = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(
          2,
          7
        )}-${phoneNumber.substring(7)}`;
      }
    }
    
    onChange(phoneNumber);
  };

  return (
    <Input
      type="tel"
      placeholder="(00) 00000-0000"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="w-full"
    />
  );
};

export default PhoneInput;
