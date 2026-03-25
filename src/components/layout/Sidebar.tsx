import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  Mail,
  UserPlus,
  LogOut,
  User,
  BarChart3,
  CalendarDays,
  FileText,
  Trophy,
} from "lucide-react";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();

  const adminLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/employees", icon: Users, label: "Employee Details" },
    { to: "/tasks", icon: ClipboardList, label: "Task Management" },
    { to: "/attendance", icon: Calendar, label: "Attendance" },
    { to: "/leave-management", icon: Calendar, label: "Leave Management" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/calendar", icon: CalendarDays, label: "Calendar View" },
    { to: "/documents", icon: FileText, label: "Documents" },
    { to: "/emails", icon: Mail, label: "Email" },
    { to: "/create-employee", icon: UserPlus, label: "Create Employee" },
  ];

  const employeeLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/profile", icon: User, label: "My Profile" },
    { to: "/my-tasks", icon: ClipboardList, label: "My Tasks" },
    { to: "/achievements", icon: Trophy, label: "Achievements" },
    { to: "/my-attendance", icon: Calendar, label: "Attendance" },
    { to: "/my-leave", icon: Calendar, label: "My Leave" },
    { to: "/calendar", icon: CalendarDays, label: "Calendar View" },
    { to: "/my-emails", icon: Mail, label: "Email" },
  ];

  const links = currentUser?.role === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">WorkSphere</h1>
        <p className="text-sm text-muted-foreground mt-1">{currentUser?.fullName}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <link.icon className="h-5 w-5" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
