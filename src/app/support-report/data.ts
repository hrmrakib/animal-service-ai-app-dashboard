export interface SupportTicket {
  id: number;
  user: number;
  user_name: string;
  user_email: string;
  description: string;
  attachment: string | null;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupportListResponse {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: SupportTicket[];
}
