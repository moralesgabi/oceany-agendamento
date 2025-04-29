
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/booking";

import Index from "./pages/Index";
import Login from "./pages/Login";
import BoatsList from "./pages/BoatsList";
import BookingPage from "./pages/BookingPage";
import MyAppointments from "./pages/MyAppointments";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/embarcacoes" element={<BoatsList />} />
              <Route path="/agendar/:boatId" element={<BookingPage />} />
              <Route path="/meus-agendamentos" element={<MyAppointments />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
