import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

const MyTasks = () => {
  const { currentUser } = useAuth();
  const { tasks, updateTask } = useData();
  const { toast } = useToast();

  const myTasks = tasks.filter(t => t.employeeId === currentUser?.id);

  const handleStatusChange = (taskId: string, newStatus: "pending" | "ongoing" | "completed") => {
    updateTask(taskId, { status: newStatus });
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "ongoing": return "secondary";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground mt-1">View and manage your assigned tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myTasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {myTasks.filter(t => t.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {myTasks.filter(t => t.status === "completed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {myTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle>{task.taskTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground">{task.taskDescription}</p>
                  </div>
                  <Badge variant={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Start: {task.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {task.status !== "completed" && (
                      <>
                        {task.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(task.id, "ongoing")}
                          >
                            Start Task
                          </Button>
                        )}
                        {task.status === "ongoing" && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(task.id, "completed")}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {myTasks.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No tasks assigned yet
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
