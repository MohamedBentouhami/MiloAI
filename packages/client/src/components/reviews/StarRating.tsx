import { FaRegStar, FaStar } from "react-icons/fa";

type Props = {
    value: number
}

export default function StarRating({ value }: Props) {

    return (
        <div className="flex gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
                index < value ?
                    <FaStar key={index}></FaStar>
                    : <FaRegStar key={index}></FaRegStar>
            ))}
        </div>
    )
}