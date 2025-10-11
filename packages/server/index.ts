import express from "express";
import type { Request, Response } from "express";
import OpenAI from "openai";
import z from "zod";
import { conversationRepository } from "./repositories/conversation.repository";



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const client = new OpenAI({
    apiKey: OPENAI_API_KEY
})

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



const chatSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, "Prompt is required")
        .max(1000, "Prompt is too long (mas 1000 characters)"),
    conversationId: z.uuid()
})

app.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt, conversationId } = req.body;
    const parseResult: any = chatSchema.safeParse(req.body);
    if (!parseResult) {
        res.status(400).json(parseResult.error.format());
        return;
    }

    try {
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id: conversationRepository.getLastResponse(conversationId)
        })
        conversationRepository.setLastResponseId(conversationId, response.id)

        res.json({ message: response.output_text });
    } catch {
        res.status(500).json({ error: 'Failed to generate a response' });
    }

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

