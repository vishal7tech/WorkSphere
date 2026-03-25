import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const { users, attendance, addAttendance, updateAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const { toast } = useToast();

  const employees = users.filter(u => u.role === "employee");
  
  const getAttendanceForDate = (employeeId: string, date: string) => {
    return attendance.find(a => a.employeeId === employeeId && a.date === date);
  };

  const dateAttendance = employees.map(emp => {
    const record = getAttendanceForDate(emp.id, selectedDate);
    return {
      employee: emp,
      status: record?.status || "absent",
    };
  });

  const presentCount = dateAttendance.filter(a => a.status === "present").length;
  const absentCount = dateAttendance.filter(a => a.status === "absent").length;

  const handleMarkAttendance = (employeeId: string, status: "present" | "absent") => {
    const existingRecord = getAttendanceForDate(employeeId, selectedDate);
    
    if (existingRecord) {
      updateAttendance(existingRecord.id, { status });
    } else {
      addAttendance({
        id: Date.now().toString(),
        employeeId,
        date: selectedDate,
        status,
      });
    }

    toast({
      title: "Attendance Updated",
      description: `Attendance marked as ${status}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Overview</h1>
          <p className="text-muted-foreground mt-1">Track employee attendance records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Employees
              </CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Present
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{presentCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Absent
              </CardTitle>
              <XCircle className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{absentCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Attendance Records</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="date">Select Date:</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dateAttendance.map(({ employee, status }) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.employeeId}</TableCell>
                      <TableCell>{employee.fullName}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{selectedDate}</TableCell>
                      <TableCell>
                        <Badge variant={status === "present" ? "default" : "destructive"}>
                          {status === "present" ? "Present" : "Absent"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant={status === "present" ? "default" : "outline"}
                            onClick={() => handleMarkAttendance(employee.id, "present")}
                          >
                            Mark Present
                          </Button>
                          <Button
                            size="sm"
                            variant={status === "absent" ? "destructive" : "outline"}
                            onClick={() => handleMarkAttendance(employee.id, "absent")}
                          >
                            Mark Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
