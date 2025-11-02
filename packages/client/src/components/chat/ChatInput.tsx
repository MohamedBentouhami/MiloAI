import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";
import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";

export type ChatFormData = {
    prompt: string;
}
type Props = {
    onSubmit: (data: ChatFormData) => void
}

export default function ChatInput({ onSubmit }: Props) {

    const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

    const submit = handleSubmit(data => {
        reset({ prompt: '' });
        onSubmit(data);

    });
    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }


    return (<form
        onSubmit={submit}
        onKeyDown={handleKeyDown}
        className="flex flex-col items-end gap-2 border-2 p-4 rounded-3xl">
        <textarea
            {...register('prompt', { required: true, validate: (data) => data.trim().length > 0 })}
            className="w-full border-0 focus:outline-0 resize-none"
            autoFocus
            placeholder="Ask anything"
            maxLength={1000} />
        <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
            <FaArrowUp />
        </Button>
    </form>)
}