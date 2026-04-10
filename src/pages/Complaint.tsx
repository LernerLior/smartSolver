import React from 'react';
import '../styles/advice_page.css';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        // ### Título
        if (line.startsWith('### ')) {
          return <h3 key={i}>{parseInline(line.slice(4))}</h3>;
        }
        // #### Subtítulo
        if (line.startsWith('#### ')) {
          return <h4 key={i}>{parseInline(line.slice(5))}</h4>;
        }
        // * Item de lista
        if (line.startsWith('* ')) {
          return <li key={i}>{parseInline(line.slice(2))}</li>;
        }
        // Linha vazia
        if (line.trim() === '') {
          return <br key={i} />;
        }
        // Parágrafo normal
        return <p key={i}>{parseInline(line)}</p>;
      })}
    </>
  );
}

// Processa negrito e itálico inline
function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

type ComplaintProps = {
  complaintTitle: string;
  complaintText: string;
  complaintsolution: string;
  complaintcategory: string;
};

async function AIAnalysis(complaintTitle: string, complaintText: string): Promise<string> {
  const res = await fetch(`${API_URL}/ai-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: complaintTitle, text: complaintText }),
  });

  const data = await res.json();
  return data.solution ?? 'Desculpe, não foi possível gerar uma solução no momento.';
}

export default function Complaint({
  complaintTitle,
  complaintText,
  complaintsolution,
  complaintcategory,
}: ComplaintProps) {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const aiSolution = await AIAnalysis(complaintTitle, complaintText);
      setSolution(aiSolution);
    } catch (err) {
      console.error(err);
      setSolution('Erro ao gerar solução. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meubody">
      <header>
        <button className="back-button" onClick={() => window.history.back()}>
          Voltar
        </button>
        <h1>Recomendações</h1>
      </header>

      <aside>
        <h2>Informações Adicionais:</h2>
        <p>Categoria: {complaintcategory}</p>
        <p>Solução registrada: {complaintsolution || 'Nenhuma solução registrada'}</p>
      </aside>

      <main>
        <h1>{complaintTitle}</h1>
        <p>{complaintText}</p>

        <h2>Recomendações da IA:</h2>

        {solution && (
          <div className="solution">
            <FormattedText text={solution} />
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleClick} disabled={loading} className="back-button">
            {loading ? "Gerando..." : "Gerar Solução com IA"}
          </button>
        </div>
      </main>
    </div>
  );
}