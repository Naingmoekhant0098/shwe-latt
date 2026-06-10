export interface CustomerResponse {
  id: number;
  name: string;
  phone: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomerRequest {
  name: string;
  phone: string;
  address: string;
}

export interface CustomerTableDataType {
  key: string | number;
  id: number;
  name: string;
  phone: string;
  address: string;
  created_at?: string;
}
