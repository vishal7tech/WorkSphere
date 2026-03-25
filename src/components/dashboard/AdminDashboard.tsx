import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Users, ClipboardList, Calendar, CheckCircle, Trophy } from "lucide-react";

const AdminDashboard = () => {
  const { users, tasks, attendance, calculatePerformanceScore } = useData();

  const employees = users.filter(u => u.role === "employee");
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const todayAttendance = attendance.filter(
    a => a.date === new Date().toISOString().split("T")[0]
  );
  const presentToday = todayAttendance.filter(a => a.status === "present").length;

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: ClipboardList,
      color: "text-warning",
    },
    {
      title: "Present Today",
      value: presentToday,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: Calendar,
      color: "text-accent",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
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
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees
                .map(emp => ({
                  ...emp,
                  score: calculatePerformanceScore(emp.id)
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{emp.fullName}</p>
                      <p className="text-sm text-muted-foreground">{emp.position}</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
                      {emp.score} pts
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
