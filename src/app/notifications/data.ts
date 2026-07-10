export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  role: string | null;
  is_read: boolean;
  created_at: string;
  user: number | null;
}
