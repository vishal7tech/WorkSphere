import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Tasks = () => {
  const { users, tasks, addTask, updateTask, deleteTask } = useData();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    employeeId: "",
    taskTitle: "",
    taskDescription: "",
    startDate: "",
    dueDate: "",
    status: "pending" as "pending" | "ongoing" | "completed",
  });
  const [skillFilter, setSkillFilter] = useState("");

  const employees = users.filter(u => u.role === "employee");

  // Skills-based employee suggestion
  const getSuggestedEmployees = () => {
    if (!skillFilter) return employees;
    
    return employees
      .map(emp => {
        const matchingSkills = (emp.skills || []).filter(skill => 
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        );
        const matchScore = matchingSkills.length;
        return { ...emp, matchScore, matchingSkills };
      })
      .filter(emp => emp.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const suggestedEmployees = getSuggestedEmployees();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({
      id: Date.now().toString(),
      ...formData,
    });

    toast({
      title: "Task Created",
      description: "New task has been assigned successfully.",
    });

    setFormData({
      employeeId: "",
      taskTitle: "",
      taskDescription: "",
      startDate: "",
      dueDate: "",
      status: "pending",
    });
    setOpen(false);
  };

  const handleStatusChange = (taskId: string, status: string) => {
    updateTask(taskId, { status: status as any });
    toast({
      title: "Task Updated",
      description: "Task status has been changed.",
    });
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
      toast({
        title: "Task Deleted",
        description: "Task has been removed.",
      });
    }
  };

  const getEmployeeName = (employeeId: string) => {
    return users.find(u => u.id === employeeId)?.fullName || "Unknown";
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Task Management</h1>
            <p className="text-muted-foreground mt-1">Assign and manage employee tasks</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Assign New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Search by Skills (Optional)</Label>
                  <Input
                    placeholder="e.g., React, Design, Management"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                  />
                  {skillFilter && suggestedEmployees.length > 0 && (
                    <p className="text-xs text-success">
                      ✓ Found {suggestedEmployees.length} matching employees
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Employee *</Label>
                  <Select
                    value={formData.employeeId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, employeeId: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {(skillFilter ? suggestedEmployees : employees).map((emp: any) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.fullName} - {emp.position}
                          {emp.matchingSkills && emp.matchingSkills.length > 0 && (
                            <span className="text-xs text-success ml-2">
                              ({emp.matchingSkills.join(", ")})
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Task Title *</Label>
                  <Input
                    value={formData.taskTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, taskTitle: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Task Description *</Label>
                  <Textarea
                    value={formData.taskDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, taskDescription: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date *</Label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Assign Task
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        {getEmployeeName(task.employeeId)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.taskTitle}</div>
                          <div className="text-sm text-muted-foreground">{task.taskDescription}</div>
                        </div>
                      </TableCell>
                      <TableCell>{task.startDate}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <Select
                          value={task.status}
                          onValueChange={(value) => handleStatusChange(task.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(task.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {tasks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No tasks assigned yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
