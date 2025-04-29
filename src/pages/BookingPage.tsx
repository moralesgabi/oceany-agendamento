
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingHeader from '@/components/booking/BookingHeader';
import DateSelection from '@/components/booking/DateSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import { useBookingForm } from '@/hooks/useBookingForm';

const BookingPage = () => {
  const {
    boat,
    availabilityDays,
    selectedDay,
    selectedTimeSlotId,
    isSubmitting,
    handleSelectDay,
    handleSelectTimeSlot,
    handleConfirmBooking
  } = useBookingForm();

  if (!boat) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BookingHeader boat={boat} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DateSelection 
              availabilityDays={availabilityDays}
              selectedDay={selectedDay}
              onSelectDay={handleSelectDay}
            />
            
            <div>
              <TimeSelection
                selectedDay={selectedDay}
                selectedTimeSlotId={selectedTimeSlotId}
                onSelectTimeSlot={handleSelectTimeSlot}
              />
            </div>
          </div>
          
          <BookingConfirmation
            isSubmitting={isSubmitting}
            disabled={!selectedDay || !selectedTimeSlotId}
            onConfirm={handleConfirmBooking}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
