import { useState } from "react";
import axios from "axios";
import { PalindromeEntry } from "@/types";

interface PalindromeFormProps {
    onNewEntry: (entry: PalindromeEntry) => void;
}

export default function PalindromeForm({ onNewEntry }: PalindromeFormProps) {
    const [text, setText] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);
    const [newText, setNewText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/isPalindrome`, { text });
            setResult(response.data.isPalindrome);
            onNewEntry(response.data.newInput);
            setNewText(response.data.newInput.text)
            setText("");
        } catch (err) {
            setError("Error al procesar la solicitud.");
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Escribe una palabra o frase"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "300px" }}
                />
                <button type="submit" style={{ padding: "0.5rem" }}>Verificar</button>
            </form>
            {result && (
                <p>
                    Resultado: <strong>{newText}</strong> {" "}
                    {result}.
                </p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
