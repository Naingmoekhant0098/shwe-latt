export interface ResultNumber {
  _id?: string;
  value: string;
}

export interface ResultResponse {
  id: string;

  DrawCategory: string | {
    _id: string;
    name: string;
    [key: string]: any;
  };

  name: string;
  nameMM: string;

  reward: string;
  amount: number;

  type: "prize" | "running";

  numbers: string[];

  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ResultRequest {
  DrawCategory: string;

  name: string;
  nameMM: string;

  reward: string;
  amount: number;

  type: "prize" | "running";

  numbers: string[];
}

export interface ResultTableDataType {
  key: string;
  id: string;

  drawCategoryName: string;

  name: string;
  nameMM: string;

  amount: number;

  type: "prize" | "running";

  numberCount: number;

  createdAt: string;
}