import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar } from "lucide-react";

const MyEmails = () => {
  const { currentUser } = useAuth();
  const { emails, users } = useData();

  const myEmails = emails.filter(e => e.receiverId === currentUser?.id);

  const getSenderName = (senderId: string) => {
    return users.find(u => u.id === senderId)?.fullName || "Admin";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Inbox</h1>
          <p className="text-muted-foreground mt-1">View messages from admin</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Badge variant="secondary">{myEmails.length} emails</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myEmails.map((email) => (
                <Card key={email.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{email.subject}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          From: {getSenderName(email.senderId)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(email.createdAt)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{email.message}</p>
                  </CardContent>
                </Card>
              ))}

              {myEmails.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyEmails;
