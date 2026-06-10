export interface DrawResponse {
  _id: number;
  drawNumber: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface DrawRequest {
  drawNumber: string;
  date: string;
}

export interface DrawTableDataType {
  key: string | number;
  _id: number;
  drawNumber: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}
