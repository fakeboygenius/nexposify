
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RestaurantProvider } from "@/context/RestaurantContext";

import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import OrderLine from "@/pages/OrderLine";
import ManageDishes from "@/pages/ManageDishes";
import ManageTable from "@/pages/ManageTable";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RestaurantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/order-line" element={<OrderLine />} />
              <Route path="/manage-dishes" element={<ManageDishes />} />
              <Route path="/manage-table" element={<ManageTable />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RestaurantProvider>
  </QueryClientProvider>
);

export default App;
