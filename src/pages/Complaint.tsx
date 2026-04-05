import React from 'react';
import '../styles/advice_page.css';
import { GoogleGenAI } from '@google/genai';
import { useState } from 'react';

function BoldTextWithLineBreaks({ text }: { text: string }) {
  const boldParts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <>
      {boldParts.map((part: string, i: number) => {
        const lines = part.split('\n');
        return lines.map((line: string, j: number) => {
          const content = i % 2 === 1 ? <strong key={j}>{line}</strong> : line;
          return (
            <React.Fragment key={`${i}-${j}`}>
              {content}
              {j < lines.length - 1 && <br />}
            </React.Fragment>
          );
        });
      })}
    </>
  );
}

type ComplaintProps = {
  complaintTitle: string;
  complaintText: string;
  complaintsolution: string;
  complaintcategory: string;
};

async function AIAnalysis(complaintTitle: string, complaintText: string) {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });
  const instruction =
    "Você é um assistente que ajuda a analisar dados de reclamações de clientes. Forneça insights úteis e sugestões de fácil entendimento com base nos dados fornecidos. Seja breve e preciso, mas apresente detalhes suficientes para que as recomendações possam ser implementadas, principalmente nas de maior importância";

  const prompt = `${instruction}\nReclamação: ${complaintTitle}\nTexto: ${complaintText}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
  });

  return response.text ?? "Desculpe, não foi possível gerar uma solução no momento.";
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
    const aiSolution = await AIAnalysis(complaintTitle, complaintText);
    setSolution(aiSolution);
    setLoading(false);
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
            <BoldTextWithLineBreaks text={solution} />
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