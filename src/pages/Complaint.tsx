import React from 'react';
import '../styles/advice_page.css';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        if (line.startsWith('### '))  return <h3 key={i}>{parseInline(line.slice(4))}</h3>;
        if (line.startsWith('#### ')) return <h4 key={i}>{parseInline(line.slice(5))}</h4>;
        if (line.startsWith('* '))    return <li key={i}>{parseInline(line.slice(2))}</li>;
        if (line.trim() === '')       return <br key={i} />;
        return <p key={i}>{parseInline(line)}</p>;
      })}
    </>
  );
}

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')  && part.endsWith('*'))  return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function ImportanceDots({ value }: { value: number }) {
  return (
    <div className="importance-dots">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`importance-dot ${i <= value ? 'importance-dot--active' : ''} ${value >= 4 && i <= value ? 'importance-dot--high' : ''}`}
        />
      ))}
    </div>
  );
}

type ComplaintProps = {
  complaintTitle: string;
  complaintText: string;
  complaintsolution: string;
  complaintcategory: string;
  complaintdate: string;
  complaintorigin: string;
  complaintimportance: number;
};

async function fetchAIAnalysis(complaintTitle: string, complaintText: string): Promise<string> {
  const res = await fetch(`${API_URL}/ai-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: complaintTitle, text: complaintText }),
  });

  const data = await res.json();
  return data.solution ?? 'Desculpe, não foi possível gerar uma solução no momento.';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [datePart, , timePart] = dateStr.split(' '); // "21/04/2026 às 19:30"
  const [day, month, year] = datePart.split('/');
  if (!day || !month || !year) return dateStr;
  const date = new Date(`${year}-${month}-${day}`);
  const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  return timePart ? `${formattedDate} às ${timePart}` : formattedDate;
}

export default function Complaint({
  complaintTitle,
  complaintText,
  complaintsolution,
  complaintcategory,
  complaintdate,
  complaintorigin,
  complaintimportance,
}: ComplaintProps) {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);

  const handleGenerateSolution = async () => {
    setLoading(true);
    try {
      const aiSolution = await fetchAIAnalysis(complaintTitle, complaintText);
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

      {/* ── Header ── */}
      <header>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Voltar
        </button>
        <h1>Recomendações</h1>
      </header>

      {/* ── Main ── */}
      <main>
        <div className="complaint-card-detail">
          <h1 className="complaint-title">{complaintTitle}</h1>
          <p className="complaint-body">{complaintText}</p>

          <span className="ai-section-label">Análise por IA</span>

          {solution && (
            <div className="solution">
              <FormattedText text={solution} />
            </div>
          )}

          <button
            className="generate-btn"
            onClick={handleGenerateSolution}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Gerando...
              </>
            ) : (
              'Gerar Solução com IA'
            )}
          </button>
        </div>
      </main>

      {/* ── Aside ── */}
      <aside>
        <p className="aside-title">Informações Adicionais</p>

        <div className="info-card">
          <p className="info-card-label">Categoria</p>
          <span className="badge">{complaintcategory || '—'}</span>
        </div>

        <div className="info-card">
          <p className="info-card-label">Data</p>
          <p className="info-card-value">{formatDate(complaintdate)}</p>
        </div>

        <div className="info-card">
          <p className="info-card-label">Origem</p>
          <p className="info-card-value">{complaintorigin || '—'}</p>
        </div>

        <div className="info-card">
          <p className="info-card-label">Urgência</p>
          <ImportanceDots value={complaintimportance} />
        </div>

        <div className="info-card">
          <p className="info-card-label">Solução Registrada</p>
          <p className="info-card-value">
            {complaintsolution || 'Nenhuma solução registrada'}
          </p>
        </div>
      </aside>

    </div>
  );
}