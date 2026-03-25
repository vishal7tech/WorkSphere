import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Task, Attendance, Email, Leave, Notification, Document } from "@/types";

interface DataContextType {
  users: User[];
  tasks: Task[];
  attendance: Attendance[];
  emails: Email[];
  leaves: Leave[];
  notifications: Notification[];
  documents: Document[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addAttendance: (attendance: Attendance) => void;
  updateAttendance: (id: string, attendance: Partial<Attendance>) => void;
  addEmail: (email: Email) => void;
  addLeave: (leave: Leave) => void;
  updateLeave: (id: string, leave: Partial<Leave>) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  calculatePerformanceScore: (userId: string) => number;
  addDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

const initializeData = () => {
  const storedUsers = localStorage.getItem("users");
  if (!storedUsers) {
    const defaultAdmin: User = {
      id: "1",
      role: "admin",
      fullName: "Admin User",
      position: "System Administrator",
      experience: "5 years",
      mobile: "+1234567890",
      city: "New York",
      email: "admin@worksphere.com",
      password: "admin123",
      contractType: "Full-time",
    };
    
    const defaultEmployees: User[] = [
      {
        id: "2",
        role: "employee",
        fullName: "John Doe",
        position: "Software Developer",
        experience: "3 years",
        mobile: "+1234567891",
        city: "San Francisco",
        email: "john@worksphere.com",
        password: "emp123",
        contractType: "Full-time",
        employeeId: "EMP001",
      },
      {
        id: "3",
        role: "employee",
        fullName: "Sarah Smith",
        position: "UI/UX Designer",
        experience: "2 years",
        mobile: "+1234567892",
        city: "Los Angeles",
        email: "sarah@worksphere.com",
        password: "emp123",
        contractType: "Part-time",
        employeeId: "EMP002",
      },
    ];
    
    localStorage.setItem("users", JSON.stringify([defaultAdmin, ...defaultEmployees]));
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    initializeData();
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
    setAttendance(JSON.parse(localStorage.getItem("attendance") || "[]"));
    setEmails(JSON.parse(localStorage.getItem("emails") || "[]"));
    setLeaves(JSON.parse(localStorage.getItem("leaves") || "[]"));
    setNotifications(JSON.parse(localStorage.getItem("notifications") || "[]"));
    setDocuments(JSON.parse(localStorage.getItem("documents") || "[]"));
  }, []);

  const addUser = (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...updatedUser } : u);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addAttendance = (newAttendance: Attendance) => {
    const updatedAttendance = [...attendance, newAttendance];
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
  };

  const addEmail = (email: Email) => {
    const updatedEmails = [...emails, email];
    setEmails(updatedEmails);
    localStorage.setItem("emails", JSON.stringify(updatedEmails));
  };

  const addLeave = (leave: Leave) => {
    const updatedLeaves = [...leaves, leave];
    setLeaves(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
  };

  const updateLeave = (id: string, updatedLeave: Partial<Leave>) => {
    const updatedLeaves = leaves.map(l => l.id === id ? { ...l, ...updatedLeave } : l);
    setLeaves(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
  };

  const addNotification = (notification: Notification) => {
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markNotificationRead = (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const updateAttendance = (id: string, updatedAttendance: Partial<Attendance>) => {
    const updatedAttendanceList = attendance.map(a => a.id === id ? { ...a, ...updatedAttendance } : a);
    setAttendance(updatedAttendanceList);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendanceList));
  };

  const addDocument = (document: Document) => {
    const updatedDocuments = [...documents, document];
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  const deleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(d => d.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  const calculatePerformanceScore = (userId: string): number => {
    const userTasks = tasks.filter(t => t.employeeId === userId);
    const userAttendance = attendance.filter(a => a.employeeId === userId);
    
    let score = 0;
    
    // Task completion score (max 50 points)
    const completedTasks = userTasks.filter(t => t.status === "completed").length;
    const totalTasks = userTasks.length;
    if (totalTasks > 0) {
      score += (completedTasks / totalTasks) * 50;
    }
    
    // Attendance score (max 30 points)
    const presentDays = userAttendance.filter(a => a.status === "present").length;
    const totalDays = userAttendance.length;
    if (totalDays > 0) {
      score += (presentDays / totalDays) * 30;
    }
    
    // Task timeliness bonus (max 20 points)
    const onTimeTasks = userTasks.filter(t => {
      if (t.status === "completed") {
        const dueDate = new Date(t.dueDate);
        const today = new Date();
        return today <= dueDate;
      }
      return false;
    }).length;
    if (completedTasks > 0) {
      score += (onTimeTasks / completedTasks) * 20;
    }
    
    return Math.round(score);
  };

  return (
    <DataContext.Provider
      value={{
        users,
        tasks,
        attendance,
        emails,
        leaves,
        notifications,
        documents,
        addUser,
        updateUser,
        deleteUser,
        addTask,
        updateTask,
        deleteTask,
        addAttendance,
        updateAttendance,
        addEmail,
        addLeave,
        updateLeave,
        addNotification,
        markNotificationRead,
        calculatePerformanceScore,
        addDocument,
        deleteDocument,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
