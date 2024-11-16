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
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <PalindromeForm onNewEntry={addNewEntry} />
        <h2>Historial</h2>
        {loading ? <p>Cargando historial...</p> : <HistoryList history={history} />}
      </div>
    </>
  );
}
