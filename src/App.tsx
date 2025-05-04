
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PastWinners from "./pages/PastWinners";
import Gallery from "./pages/Gallery";
import Nominees from "./pages/Nominees";
import NomineeProfile from "./pages/NomineeProfile";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import ImpactStories from "./pages/ImpactStories";
import AwardProcess from "./pages/AwardProcess"; // Add import for new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/past-winners" element={<PastWinners />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/nominees" element={<Nominees />} />
          <Route path="/nominees/:id" element={<NomineeProfile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/impact-stories" element={<ImpactStories />} />
          <Route path="/award-process" element={<AwardProcess />} /> {/* Add new route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
