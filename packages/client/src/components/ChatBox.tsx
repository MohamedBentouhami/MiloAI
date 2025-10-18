import { useForm } from 'react-hook-form';
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";

type FormData = {
    prompt: string;
}

export default function ChatBox() {
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data)
        reset();
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)()
        }
    }

    return (
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
        </form>)
}