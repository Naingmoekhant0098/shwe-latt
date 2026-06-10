export interface TicketPrize {
  _id?: string;
  prizeName: string;
  rewardAmount: number;
}
export interface TicketResponse {
  ticketNumber: string;
  id: string;
  DrawCategory: string | { _id: string; name: string; [key: string]: any }; // Can be populated
  Agent: string | { _id: string; name: string; [key: string]: any }; // Can be populated
  number: string;
  prizes: TicketPrize[];
  totalReward: number;
  status: "pending" | "won" | "lost";
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface TicketRequest {
  DrawCategory: string;
  Agent: string;
  number: string;
  prizes?: TicketPrize[];
}

export interface TicketTableDataType {
  key: string;
  id: string;
  number: string;
  drawCategoryName: string;
  agentName: string;
  totalReward: number;
  status: "pending" | "won" | "lost";
  prizeCount: number;
  createdAt: string;
}
