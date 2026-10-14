export interface Role {
  id: number;
  name: string;
  level: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: Role;
  is_active: boolean;
  created_at: string;
  permissions: string[];
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmed_password: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileUpdatePayload {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirmed_password: string;
}

export interface CourseProgress {
  course_id: number;
  course_title: string;
  chapter_id: string;
  chapter_title: string;
  chapter_url: string;
  last_visited_at: string;
}

export interface CourseProgressPayload {
  course_id: number;
  course_title: string;
  chapter_id: string;
  chapter_title: string;
  chapter_url: string;
}

export interface Dashboard {
  courses: CourseProgress[];
  total_started: number;
}

export interface MessageResponse {
  message: string;
}

export interface ValidationField {
  loc: string;
  msg: string;
}
