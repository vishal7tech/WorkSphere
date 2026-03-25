import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Emails = () => {
  const { users, addEmail } = useData();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    receiverId: "",
    subject: "",
    message: "",
  });

  const employees = users.filter(u => u.role === "employee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.receiverId === "all") {
      employees.forEach(emp => {
        addEmail({
          id: Date.now().toString() + emp.id,
          senderId: currentUser?.id || "",
          receiverId: emp.id,
          subject: formData.subject,
          message: formData.message,
          createdAt: new Date().toISOString(),
        });
      });
      
      toast({
        title: "Emails Sent",
        description: `Message sent to all ${employees.length} employees.`,
      });
    } else {
      addEmail({
        id: Date.now().toString(),
        senderId: currentUser?.id || "",
        receiverId: formData.receiverId,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
      
      const receiverName = users.find(u => u.id === formData.receiverId)?.fullName;
      toast({
        title: "Email Sent",
        description: `Message sent to ${receiverName}.`,
      });
    }

    setFormData({
      receiverId: "",
      subject: "",
      message: "",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Send Email</h1>
          <p className="text-muted-foreground mt-1">Send messages to employees</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Compose Message</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>To *</Label>
                <Select
                  value={formData.receiverId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, receiverId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.fullName} - {emp.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject *</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Message *</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Type your message here..."
                  rows={8}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Emails;
