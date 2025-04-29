
import { Boat, Appointment, AppointmentPeriod, AppointmentStatus, TimeSlot, AvailabilityDay } from '@/types';

export interface BookingContextProps {
  boats: Boat[];
  availabilityDays: AvailabilityDay[];
  appointments: Appointment[];
  selectedBoat: Boat | null;
  selectedDay: AvailabilityDay | null;
  selectedTimeSlotId: string | null;
  getBoat: (id: string) => Boat | undefined;
  getAvailabilityDay: (date: string) => AvailabilityDay | undefined;
  setSelectedBoat: (boat: Boat | null) => void;
  setSelectedDay: (day: AvailabilityDay | null) => void;
  setSelectedTimeSlotId: (id: string | null) => void;
  createAppointment: (userId: string, boatId: string, date: string, timeSlotId: string) => Promise<Appointment>;
  getMyAppointments: (userId: string) => Appointment[];
  updateBoat: (boat: Boat) => void;
  updateAvailability: (dayDate: string, isAvailable: boolean) => void;
  updateTimeSlotAvailability: (dayDate: string, timeSlotId: string, isAvailable: boolean) => void;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => Promise<void>;
}
