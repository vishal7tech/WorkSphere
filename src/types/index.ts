export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  position: string;
  experience: string;
  mobile: string;
  city: string;
  email: string;
  password: string;
  photoUrl?: string;
  contractType: string;
  employeeId?: string;
  skills?: string[];
  performanceScore?: number;
}

export interface Task {
  id: string;
  employeeId: string;
  taskTitle: string;
  taskDescription: string;
  startDate: string;
  dueDate: string;
  status: "pending" | "ongoing" | "completed";
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: "present" | "absent";
}

export interface Email {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  adminComment?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "task" | "leave" | "attendance" | "email" | "performance";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Document {
  id: string;
  employeeId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
  expiryDate?: string;
  category: "contract" | "id" | "certificate" | "other";
}
