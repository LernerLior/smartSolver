import { useState } from "react";

type complaint = {
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_num: number;
  complaint_per: number;
};

type LoadButtonProps = {
  setLista: (data: complaint[]) => void;
};

export default function LoadButton({ setLista }: LoadButtonProps) {
  const [loading, setLoading] = useState(false);

  const carregarReclamacoes = async () => {
    setLoading(true);

    try {
        console.log("Fetching data from API...");
        // console.log("Response received:", `${import.meta.env.VITE_APP_API_URL}/run-main`);
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/run-main`, {
        method: "POST",
      });

      
      const data = await res.json();

      if (data.status === "success") {
        setLista(data.data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar as reclamações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={carregarReclamacoes} disabled={loading}>
      {loading ? "Carregando..." : "Carregar novos dados"}
    </button>
  );
}
