import { PalindromeEntry } from "@/types";

interface HistoryListProps {
    history: PalindromeEntry[];
    handleDelete: () => void
}

export default function HistoryList({ history, handleDelete }: HistoryListProps) {

    return (
        <div className="w-[90vw] md:w-[50vw]">
            {
                history.length > 0 ? (
                    <button
                        className="hover:bg-gray-600 p-2 text-white bg-gray-500 mb-2"
                        onClick={handleDelete}
                    >
                        Eliminar Historial
                    </button>
                ) : (
                    <p className="text-center text-xl text-white">No hay historial</p>
                )
            }
            <div className="h-[calc(100vh-300px)] scrollbar overflow-y-auto">
                <ul>
                    {history.map(({ _id, text, isPalindrome }) => (
                        <li key={_id} className="text-white hover:bg-gray-600 p-2">
                            <strong className={`break-words ${isPalindrome ? 'text-green-400' : 'text-red-600'} `}>
                                {text}
                            </strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
