import { z } from "zod";

export const loginSchema = z.object({
  devId: z.string().min(1, "Developer ID is required"),
  password: z.string().min(1, "Password is required"),
});

export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T 
}

export interface ApiDetailResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T,
  
}

export interface ApiListResponse<T> {
  drawCategories: any;
  agents: any[];
  status: boolean;
  statusCode: number;
  message: string;
  data: T[],
  
  meta : {
    limit : number,
    page:number,
    total:number,
    totalPages:number

  }
}

export type LoginFormInputs = z.infer<typeof loginSchema>;