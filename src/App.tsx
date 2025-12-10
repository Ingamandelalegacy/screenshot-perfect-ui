import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverall from "./pages/DashboardOverall";
import DashboardDemographics from "./pages/DashboardDemographics";
import DashboardPerformance from "./pages/DashboardPerformance";
import ManageUsers from "./pages/ManageUsers";
import AddUser from "./pages/AddUser";
import ManageTargets from "./pages/ManageTargets";
import NeedsAnalysisRequests from "./pages/NeedsAnalysisRequests";
import NeedsAnalysis from "./pages/NeedsAnalysis";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/overall" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/overall" element={<DashboardOverall />} />
            <Route path="/dashboard/demographics" element={<DashboardDemographics />} />
            <Route path="/dashboard/performance" element={<DashboardPerformance />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-users/add" element={<AddUser />} />
            <Route path="/manage-targets" element={<ManageTargets />} />
            <Route path="/needs-analysis-requests" element={<NeedsAnalysisRequests />} />
            <Route path="/needs-analysis" element={<NeedsAnalysis />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
