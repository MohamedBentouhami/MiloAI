import { useRef, useState } from 'react';
import axios from 'axios';
import TypingIndicator from './TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3'


type chatResponse = {
    message: string
}

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2


export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, isLoading] = useState(false);
    const conversationId = useRef(crypto.randomUUID);
    const [error, setError] = useState('');


    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            setMessages(prev => [...prev, { content: prompt, role: 'user' }]);
            isLoading(true);
            setError('');
            popAudio.play();
            const { data } = await axios.post<chatResponse>('/api/chat', {
                prompt,
                conversationId: conversationId.current
            });
            setMessages(prev => [...prev, { content: data.message, role: 'bot' }]);
            notificationAudio.play();
        } catch (error) {
            console.log(error);
            setError('Something went wrong, try again');
        } finally {
            isLoading(false);

        }
    }


    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-col flex-1 gap-3 mb-10 overflow-y-auto'>
                <ChatMessages messages={messages} />
                {loading && <TypingIndicator />}
                {error && <p className='text-red-500'>{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    )
}