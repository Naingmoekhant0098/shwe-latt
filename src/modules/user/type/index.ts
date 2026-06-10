export interface Role {
  id: number;
  name: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  isVerify: number;
  phone : string;
  roles: Role[];
  created_at?: string;
  updated_at?: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role_ids: number[];
}

export interface UserTableDataType {
  key: string | number;
  id: number;
  name: string;
  email: string;
  phone : string;
  is_active: number;
  role: any;
  created_at?: string;
}
