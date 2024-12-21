import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/cart/CartProvider";
import { usePageTracking } from "./hooks/usePageTracking";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import CartPage from './pages/CartPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import PromoCodesPage from './pages/PromoCodesPage';
import OrderPreviewPage from './pages/OrderPreviewPage';

const queryClient = new QueryClient();

// Wrapper component to implement tracking
const TrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TrackingWrapper>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/*" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/promo-codes" element={<PromoCodesPage />} />
              <Route path="/order-preview" element={<OrderPreviewPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-failure" element={<PaymentFailurePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TrackingWrapper>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;