import { PalindromeEntry } from "@/types";

interface HistoryListProps {
    history: PalindromeEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
    return (
        <div className="w-[90vw] md:w-[50vw]">
            <div className="h-[calc(100vh-200px)] scrollbar overflow-y-auto">
            <ul>
                {history.map(({ _id, text }) => (
                    <li key={_id} className="text-white hover:bg-gray-600 p-2">
                        <strong className='break-words'>{text}</strong>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}
