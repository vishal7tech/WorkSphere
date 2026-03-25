import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { ClipboardList, Calendar, CheckCircle, Trophy } from "lucide-react";

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const { tasks, attendance, calculatePerformanceScore } = useData();

  const myTasks = tasks.filter(t => t.employeeId === currentUser?.id);
  const pendingTasks = myTasks.filter(t => t.status === "pending").length;
  const completedTasks = myTasks.filter(t => t.status === "completed").length;
  
  const myAttendance = attendance.filter(a => a.employeeId === currentUser?.id);
  const presentDays = myAttendance.filter(a => a.status === "present").length;
  
  const performanceScore = currentUser ? calculatePerformanceScore(currentUser.id) : 0;
  
  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return { label: "Outstanding", color: "bg-success/10 text-success" };
    if (score >= 60) return { label: "Good", color: "bg-primary/10 text-primary" };
    if (score >= 40) return { label: "Average", color: "bg-warning/10 text-warning" };
    return { label: "Needs Improvement", color: "bg-destructive/10 text-destructive" };
  };
  
  const performanceLevel = getPerformanceLevel(performanceScore);

  const stats = [
    {
      title: "Total Tasks",
      value: myTasks.length,
      icon: ClipboardList,
      color: "text-primary",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: Calendar,
      color: "text-warning",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Days Present",
      value: presentDays,
      icon: CheckCircle,
      color: "text-accent",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {currentUser?.fullName}</h1>
          <p className="text-muted-foreground mt-1">{currentUser?.position}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-warning/5 to-warning/10">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Performance Score</p>
                  <p className="text-4xl font-bold text-foreground">{performanceScore}</p>
                </div>
                <Badge className={performanceLevel.color}>
                  {performanceLevel.label}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Task Completion</span>
                  <span className="font-medium">{myTasks.length > 0 ? Math.round((completedTasks / myTasks.length) * 100) : 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className="font-medium">{myAttendance.length > 0 ? Math.round((presentDays / myAttendance.length) * 100) : 0}%</span>
                </div>
              </div>

              <div className="pt-3 border-t space-y-1">
                <p className="text-xs text-muted-foreground">💡 Performance Tips:</p>
                <p className="text-xs text-muted-foreground">• Complete tasks before deadlines (+20 pts)</p>
                <p className="text-xs text-muted-foreground">• Maintain good attendance (+30 pts)</p>
                <p className="text-xs text-muted-foreground">• Finish all assigned tasks (+50 pts)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
