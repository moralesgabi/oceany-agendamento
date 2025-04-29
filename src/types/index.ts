
export interface User {
  id: string;
  phone: string;
  name?: string;
  isAdmin: boolean;
}

export interface Boat {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  available: boolean;
}

export type AppointmentPeriod = 'morning' | 'afternoon' | 'full';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  userId: string;
  boatId: string;
  date: string;
  period: AppointmentPeriod;
  status: AppointmentStatus;
  created: Date;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  period: AppointmentPeriod;
}

export interface AvailabilityDay {
  date: string;
  available: boolean;
  timeSlots: TimeSlot[];
}
