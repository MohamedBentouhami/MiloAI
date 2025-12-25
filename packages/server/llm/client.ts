import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: OPENAI_API_KEY,
});

type GeneratedTextOptions = {
    model?: string;
    prompt: string;
}

export const llmClient = {
    async generateText({ model = 'openai/gpt-oss-20b:free', prompt }: GeneratedTextOptions): Promise<string> {
        const response = await client.chat.completions.create({
            model,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        return response.choices[0]?.message.content || "";
    }
};