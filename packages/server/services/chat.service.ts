import OpenAI from "openai"
import { conversationRepository } from "../repositories/conversation.repository"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
}

export const chatService = {
    async sendMessage(prompt: string, conversationId: string): Promise<ChatResponse> {
        
        const completion: any = await openai.chat.completions.create({
            model: 'openai/gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        })

        const responseId: string = completion.choices[0].index;
        conversationRepository.setLastResponseId(conversationId, responseId);

        return { id: responseId, message: completion.choices[0].message.content };
    }
}