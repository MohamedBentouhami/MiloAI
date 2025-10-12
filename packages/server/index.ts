import express from "express";
import type { Request, Response } from "express";
import z from "zod";
import { chatService } from "./services/chat.service";



const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



const chatSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, "Prompt is required")
        .max(1000, "Prompt is too long (max 1000 characters)"),
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
        const response = await chatService.sendMessage(prompt, conversationId);
        res.json({ message: response.message });
    } catch {
        res.status(500).json({ error: 'Failed to generate a response' });
    }

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

