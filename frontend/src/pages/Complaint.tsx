import React from 'react';
import '../styles/advice_page.css';
import { GoogleGenAI } from '@google/genai';
import { useState } from 'react';

function BoldTextWithLineBreaks({ text }: { text: string }) {
  // Primeiro, separamos o texto por ** para identificar bold
  const boldParts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <>
      {boldParts.map((part: string, i: number) => {
        // Agora, para cada parte, dividimos por \n
        const lines = part.split('\n');

        return lines.map((line: string, j: number) => {
          // Se for índice ímpar, é bold
          const content = i % 2 === 1 ? <strong key={j}>{line}</strong> : line;

          // Adiciona <br /> só se não for a última linha
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
  numComplaints: string | number;
  complaintPercent: string | number;
  complaintsolution: string;
};

async function AIAnalysis(complaintTitle: string, complaintText: string) {
  const GEMINI_API_KEY = 'AIzaSyBZ-WM6TY66d-tnASTu8hZa4n7pRoaYo0w';
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const instruction =
    "Você é um assistente que ajuda a analisar dados de reclamações de clientes. Forneça insights úteis e sugestões de fácil entendimento com base nos dados fornecidos.Seja breve e preciso.";

  const prompt = `${instruction}\nReclamação: ${complaintTitle}\nTexto: ${complaintText}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
  });


  const text = response.text;

  return text ?? "Desculpe, não foi possível gerar uma solução no momento.";
}


export default function Complaint({
  complaintTitle,
  complaintText,
  numComplaints,
  complaintPercent,
  complaintsolution,
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
        <p>Número de Reclamações: {numComplaints}</p>
        <p>Percentual de Reclamações em relação ao total: {complaintPercent}</p>
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
          <button onClick={handleClick} disabled={loading}>
            {loading ? "Gerando..." : "Gerar Solução com IA"}
          </button>
        </div>
      </main>
    </div>
  );
}