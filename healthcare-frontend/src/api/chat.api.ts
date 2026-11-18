import apiClient from "@/lib/apiClient";
import type { ChatPayload, ChatResponse } from "@/types";

export function sendChatMessage(payload: ChatPayload) {
  return apiClient<ChatResponse>("/chat", {
    method: "POST",
    body: payload,
  });
}
