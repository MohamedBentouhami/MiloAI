import { llmClient } from "../llm/client";

type ChatResponse = {
    id: string;
    message: string;
}

export const chatService = {
    async sendMessage(prompt: string, conversationId: string): Promise<ChatResponse> {
        const message = await llmClient.generateText({ model: undefined, prompt })
        return { id: conversationId, message };
    }
}
