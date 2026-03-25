import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

const LeaveManagement = () => {
  const { leaves, users, updateLeave, addNotification } = useData();
  const { toast } = useToast();
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null);
  const [adminComment, setAdminComment] = useState("");

  const getEmployeeName = (employeeId: string) => {
    const employee = users.find(u => u.id === employeeId);
    return employee?.fullName || "Unknown";
  };

  const handleStatusUpdate = (leaveId: string, newStatus: "approved" | "rejected") => {
    const leave = leaves.find(l => l.id === leaveId);
    if (!leave) return;

    updateLeave(leaveId, {
      status: newStatus,
      adminComment: adminComment || undefined,
    });

    // Add notification to employee
    addNotification({
      id: Date.now().toString(),
      userId: leave.employeeId,
      type: "leave",
      title: `Leave Request ${newStatus === "approved" ? "Approved" : "Rejected"}`,
      message: `Your leave request from ${leave.startDate} to ${leave.endDate} has been ${newStatus}.${adminComment ? ` Admin comment: ${adminComment}` : ""}`,
      read: false,
      createdAt: new Date().toISOString(),
    });

    toast({
      title: "Leave Updated",
      description: `Leave request has been ${newStatus}.`,
    });

    setSelectedLeave(null);
    setAdminComment("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
      case "pending": return "bg-warning/10 text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const pendingLeaves = leaves.filter(l => l.status === "pending");
  const processedLeaves = leaves.filter(l => l.status !== "pending");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage employee leave requests</p>
        </div>

        <div className="grid gap-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Pending Requests ({pendingLeaves.length})
              </CardTitle>
              <CardDescription>Requires your approval</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingLeaves.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No pending requests</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{getEmployeeName(leave.employeeId)}</TableCell>
                        <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                        <TableCell>
                          {selectedLeave === leave.id ? (
                            <div className="space-y-2 min-w-[200px]">
                              <Textarea
                                placeholder="Add comment (optional)"
                                value={adminComment}
                                onChange={(e) => setAdminComment(e.target.value)}
                                className="text-sm"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(leave.id, "approved")}
                                  className="flex-1"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusUpdate(leave.id, "rejected")}
                                  className="flex-1"
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedLeave(null);
                                    setAdminComment("");
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedLeave(leave.id)}
                            >
                              Review
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* All Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                All Leave Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admin Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...leaves]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{getEmployeeName(leave.employeeId)}</TableCell>
                        <TableCell>
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{leave.reason}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {leave.adminComment || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveManagement;
