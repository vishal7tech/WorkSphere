import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle } from "lucide-react";

const MyAttendance = () => {
  const { currentUser } = useAuth();
  const { attendance, addAttendance } = useData();
  const { toast } = useToast();
  const [isMarking, setIsMarking] = useState(false);

  const myAttendance = attendance.filter(a => a.employeeId === currentUser?.id);
  const today = new Date().toISOString().split("T")[0];
  const hasMarkedToday = myAttendance.some(a => a.date === today);

  const handleMarkAttendance = () => {
    if (hasMarkedToday) {
      toast({
        title: "Already Marked",
        description: "You've already marked attendance for today.",
        variant: "destructive",
      });
      return;
    }

    setIsMarking(true);
    addAttendance({
      id: Date.now().toString(),
      employeeId: currentUser?.id || "",
      date: today,
      status: "present",
    });

    toast({
      title: "Attendance Marked",
      description: "Your attendance for today has been recorded.",
    });
    setIsMarking(false);
  };

  const sortedAttendance = [...myAttendance].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your attendance records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Days
              </CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myAttendance.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Days Present
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {myAttendance.filter(a => a.status === "present").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasMarkedToday ? (
                <Badge className="text-lg px-4 py-2">
                  Present
                </Badge>
              ) : (
                <Button
                  onClick={handleMarkAttendance}
                  disabled={isMarking}
                  className="w-full"
                >
                  Mark Present
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAttendance.map((record) => {
                    const date = new Date(record.date);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>{dayName}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "present" ? "default" : "destructive"}>
                            {record.status === "present" ? "Present" : "Absent"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {sortedAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No attendance records yet
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

export default MyAttendance;
