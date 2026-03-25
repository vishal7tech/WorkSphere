import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Emails from "./pages/Emails";
import MyProfile from "./pages/MyProfile";
import MyTasks from "./pages/MyTasks";
import MyAttendance from "./pages/MyAttendance";
import MyEmails from "./pages/MyEmails";
import LeaveManagement from "./pages/LeaveManagement";
import MyLeave from "./pages/MyLeave";
import Analytics from "./pages/Analytics";
import CalendarView from "./pages/CalendarView";
import Documents from "./pages/Documents";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="worksphere-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <DataProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              
              {/* Admin Routes */}
              <Route path="/employees" element={<ProtectedRoute requiredRole="admin"><Employees /></ProtectedRoute>} />
              <Route path="/create-employee" element={<ProtectedRoute requiredRole="admin"><CreateEmployee /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute requiredRole="admin"><Tasks /></ProtectedRoute>} />
              <Route path="/attendance" element={<ProtectedRoute requiredRole="admin"><Attendance /></ProtectedRoute>} />
              <Route path="/leave-management" element={<ProtectedRoute requiredRole="admin"><LeaveManagement /></ProtectedRoute>} />
              <Route path="/emails" element={<ProtectedRoute requiredRole="admin"><Emails /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute requiredRole="admin"><Analytics /></ProtectedRoute>} />
              <Route path="/documents" element={<ProtectedRoute requiredRole="admin"><Documents /></ProtectedRoute>} />
              
              {/* Employee Routes */}
              <Route path="/profile" element={<ProtectedRoute requiredRole="employee"><MyProfile /></ProtectedRoute>} />
              <Route path="/my-tasks" element={<ProtectedRoute requiredRole="employee"><MyTasks /></ProtectedRoute>} />
              <Route path="/my-attendance" element={<ProtectedRoute requiredRole="employee"><MyAttendance /></ProtectedRoute>} />
              <Route path="/my-leave" element={<ProtectedRoute requiredRole="employee"><MyLeave /></ProtectedRoute>} />
              <Route path="/my-emails" element={<ProtectedRoute requiredRole="employee"><MyEmails /></ProtectedRoute>} />
              
              {/* Shared Routes */}
              <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
              <Route path="/achievements" element={<ProtectedRoute requiredRole="employee"><Achievements /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
