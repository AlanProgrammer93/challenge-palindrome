"use client"

import HistoryList from "@/components/HistoryList";
import PalindromeForm from "@/components/PalindromeForm";
import { PalindromeEntry } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [history, setHistory] = useState<PalindromeEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/historial`);
      setHistory(response.data.historial);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewEntry = (entry: PalindromeEntry) => {
    setHistory([entry, ...history]);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-slate-700">
        <PalindromeForm onNewEntry={addNewEntry} />
        <h2 className='text-white py-2 text-2xl'>Historial</h2>
        {loading ? <p className='text-white text-2xl'>Cargando historial...</p> : <HistoryList history={history} />}
      </main>
    </>
  );
}
