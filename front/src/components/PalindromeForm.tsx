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

        if (!text) {
            setNewText('')
            setError("Debes ingresar un texto.");
            setResult(null)
            return
        }

        try {
            const response = await axios.post(`http://localhost:3000/isPalindrome`, { text });
            setResult(response.data.isPalindrome);
            onNewEntry(response.data.newInput);
            setNewText(response.data.newInput.text)
            setText("");
            setError("");
        } catch (err) {
            setError("Error al procesar la solicitud.");
            setResult(null)
            console.error(err);
        }
    };

    return (
        <div className="pt-12 w-[90vw] md:w-[50vw]">
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Escribe una palabra o frase"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='w-full p-2 outline-none mb-2'
                    />
                    <button
                        type="submit"
                        className="hover:bg-gray-600 p-2 text-white bg-gray-500 mb-2"
                    >
                        Verificar
                    </button>
                </div>
            </form>
            {result && (
                <p className='text-green-500 break-words'>
                    Resultado: <strong>"{newText}"</strong> {" "}
                    {result}.
                </p>

            )}
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
}
