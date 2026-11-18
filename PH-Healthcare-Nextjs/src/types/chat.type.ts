export interface ChatPayload {
  message: string;
  sessionId?: string;
}

export interface ChatDoctor {
  id: string;
  name: string;
  specialization: string;
  qualifications?: string;
  experienceYears?: number;
  consultationFee?: number | string | null;
  bio?: string | null;
}

export interface ChatReply {
  sessionId: string;
  answer: string;
  doctors: ChatDoctor[];
}

export interface ChatResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ChatReply;
}
