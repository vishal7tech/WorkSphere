import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Zap, Target, Crown } from "lucide-react";
import { useEffect, useState } from "react";

interface BadgeAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  requirement?: number;
}

const Achievements = () => {
  const { currentUser } = useAuth();
  const { tasks, attendance } = useData();
  const [badges, setBadges] = useState<BadgeAchievement[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const myTasks = tasks.filter(t => t.employeeId === currentUser.id);
    const myAttendance = attendance.filter(a => a.employeeId === currentUser.id);
    const completedTasks = myTasks.filter(t => t.status === "completed").length;
    const presentDays = myAttendance.filter(a => a.status === "present").length;

    const achievementsList: BadgeAchievement[] = [
      {
        id: "first_task",
        name: "First Task",
        description: "Complete your first task",
        icon: "star",
        earned: completedTasks >= 1,
        progress: completedTasks,
        requirement: 1,
      },
      {
        id: "task_master",
        name: "Task Master",
        description: "Complete 10 tasks",
        icon: "trophy",
        earned: completedTasks >= 10,
        progress: completedTasks,
        requirement: 10,
      },
      {
        id: "productivity_pro",
        name: "Productivity Pro",
        description: "Complete 50 tasks",
        icon: "zap",
        earned: completedTasks >= 50,
        progress: completedTasks,
        requirement: 50,
      },
      {
        id: "perfect_attendance",
        name: "Perfect Attendance",
        description: "30 consecutive days present",
        icon: "target",
        earned: presentDays >= 30,
        progress: presentDays,
        requirement: 30,
      },
      {
        id: "attendance_champion",
        name: "Attendance Champion",
        description: "100 days present",
        icon: "crown",
        earned: presentDays >= 100,
        progress: presentDays,
        requirement: 100,
      },
      {
        id: "team_player",
        name: "Team Player",
        description: "Help 5 colleagues with tasks",
        icon: "award",
        earned: false,
        progress: 0,
        requirement: 5,
      },
    ];

    setBadges(achievementsList);
  }, [currentUser, tasks, attendance]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy": return Trophy;
      case "award": return Award;
      case "star": return Star;
      case "zap": return Zap;
      case "target": return Target;
      case "crown": return Crown;
      default: return Trophy;
    }
  };

  const earnedCount = badges.filter(b => b.earned).length;
  const totalBadges = badges.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievements & Badges</h1>
          <p className="text-muted-foreground mt-1">Track your accomplishments and milestones</p>
        </div>

        {/* Summary Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Your Progress
            </CardTitle>
            <CardDescription>
              You've earned {earnedCount} out of {totalBadges} achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">{earnedCount}/{totalBadges}</div>
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full transition-all"
                    style={{ width: `${(earnedCount / totalBadges) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {((earnedCount / totalBadges) * 100).toFixed(0)}% Complete
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const IconComponent = getIcon(badge.icon);
            const progress = badge.progress || 0;
            const requirement = badge.requirement || 1;
            const progressPercentage = Math.min((progress / requirement) * 100, 100);

            return (
              <Card
                key={badge.id}
                className={`transition-all hover:shadow-lg ${
                  badge.earned
                    ? "border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10"
                    : "opacity-60 grayscale"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <IconComponent
                          className={`h-5 w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                        />
                        {badge.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{badge.description}</CardDescription>
                    </div>
                    {badge.earned && (
                      <Badge className="bg-success text-success-foreground">Earned</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!badge.earned && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {progress}/{requirement}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {badge.earned && (
                    <div className="text-sm text-success font-medium">
                      ✓ Achievement Unlocked!
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;
