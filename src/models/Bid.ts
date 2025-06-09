export interface Bid {
  id?: number;
  job_id: number;
  freelancer_id: number;
  created_at?:string;
  bid_amount: number;
  work_time_line: string;
}
