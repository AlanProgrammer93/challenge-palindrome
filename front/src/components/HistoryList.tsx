import { PalindromeEntry } from "@/types";

interface HistoryListProps {
    history: PalindromeEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
    return (
        <ul style={{ listStyleType: "none", padding: 0 }}>
            {history.map(({ _id, text }) => (
                <li key={_id} style={{ marginBottom: "0.5rem" }}>
                    <strong>{text}</strong>
                </li>
            ))}
        </ul>
    );
}
