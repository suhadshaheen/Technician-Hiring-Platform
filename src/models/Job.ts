export interface Job {
  id: number;
  title: string;
  description: string;
  status: string;
  location: string;
  category: string;
  job_requirements?: string;
  deadline?: string;
  posting_date?: string;
  job_owner_id: number;
  JobPhoto?: string;
  budget: number;
  attempts?: number;
  available_at?: string;
}