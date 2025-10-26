import { useRef, useState, type KeyboardEvent } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";

type FormData = {
    prompt: string;
}

type chatResponse = {
    message: string
}

type Message = {
    content: string;
    role: 'user' | 'bot'
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, isLoading] = useState(false);
    const conversationId = useRef(crypto.randomUUID);
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = async ({ prompt }: FormData) => {
        setMessages(prev => [...prev, { content: prompt, role: 'user' }]);
        isLoading(false);
        reset();
        const { data } = await axios.post<chatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current
        });
        setMessages(prev => [...prev, { content: data.message, role: 'bot' }]);
        isLoading(false);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)()
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-3 mb-10'>
                {messages.map((message, index) => <p key={index}
                    className={`px-3 py-1 rounded-xl ${message.role === 'user' ?
                        'bg-blue-600 text-white self-end' :
                        'bg-gray-100 text-black'}`}>
                    <ReactMarkdown>
                        {message.content}
                    </ReactMarkdown>

                </p>)}
                {loading && (
                    <div className='flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl'>
                        <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse'></div>)
                        <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]'></div>)
                        <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]'></div>)
                    </div>)
                }
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="flex flex-col items-end gap-2 border-2 p-4 rounded-3xl">
                <textarea
                    {...register('prompt', { required: true, validate: (data) => data.trim().length > 0 })}
                    className="w-full border-0 focus:outline-0 resize-none"
                    placeholder="Ask anything"
                    maxLength={1000} />
                <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
                    <FaArrowUp />
                </Button>
            </form>
        </div>
    )
}