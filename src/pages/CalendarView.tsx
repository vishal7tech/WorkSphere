import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const CalendarView = () => {
  const { currentUser } = useAuth();
  const { tasks, leaves, users } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());

  const isAdmin = currentUser?.role === "admin";
  
  // Filter data based on role
  const myTasks = isAdmin ? tasks : tasks.filter(t => t.employeeId === currentUser?.id);
  const myLeaves = isAdmin ? leaves : leaves.filter(l => l.employeeId === currentUser?.id);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date: string) => {
    const events: any[] = [];
    
    // Check tasks
    myTasks.forEach(task => {
      if (task.startDate === date) {
        const employee = users.find(u => u.id === task.employeeId);
        events.push({
          type: "task-start",
          title: task.taskTitle,
          employee: employee?.fullName,
          color: "bg-primary/10 text-primary",
        });
      }
      if (task.dueDate === date) {
        const employee = users.find(u => u.id === task.employeeId);
        events.push({
          type: "task-due",
          title: `Due: ${task.taskTitle}`,
          employee: employee?.fullName,
          color: "bg-destructive/10 text-destructive",
        });
      }
    });

    // Check leaves
    myLeaves.forEach(leave => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const current = new Date(date);
      
      if (current >= start && current <= end && leave.status === "approved") {
        const employee = users.find(u => u.id === leave.employeeId);
        events.push({
          type: "leave",
          title: isAdmin ? `${employee?.fullName} - Leave` : "Leave",
          color: "bg-warning/10 text-warning",
        });
      }
    });

    return events;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar View</h1>
            <p className="text-muted-foreground mt-1">Visual overview of tasks and leaves</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 min-w-[200px] justify-center">
              <CalendarIcon className="h-4 w-4" />
              <span className="font-semibold">{monthName}</span>
            </div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm">Task Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-sm">Task Due</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-sm">Leave</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[120px] border border-border rounded-lg bg-muted/20"></div>
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const events = getEventsForDate(dateStr);
                const isToday = new Date().toISOString().split('T')[0] === dateStr;
                
                return (
                  <div
                    key={day}
                    className={`min-h-[120px] border rounded-lg p-2 transition-colors hover:bg-muted/50 ${
                      isToday ? "border-primary border-2 bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-2 ${isToday ? "text-primary" : ""}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map((event, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className={`text-[10px] w-full justify-start truncate ${event.color}`}
                        >
                          {event.title}
                        </Badge>
                      ))}
                      {events.length > 3 && (
                        <Badge variant="outline" className="text-[10px] w-full justify-start">
                          +{events.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarView;
