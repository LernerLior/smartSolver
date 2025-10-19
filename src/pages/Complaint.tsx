import React from 'react';
import '../styles/advice_page.css';
function BoldTextWithLineBreaks({ text }: { text: string }) {
  // Primeiro, separamos o texto por ** para identificar bold
  const boldParts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <>
      {boldParts.map((part: string, i: number) => {
        // Agora, para cada parte, dividimos por \n
        const lines = part.split("\n");

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

export default function Complaint({
  complaintTitle,
  complaintText,
  numComplaints,
  complaintPercent,
  complaintsolution,
}: ComplaintProps) {
  return (
    <div className="meubody">
      <header>
        <button className="back-button" onClick={() => window.history.back()}>Voltar</button>
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
        <h2>Recomendações:</h2>
        <p>
          <BoldTextWithLineBreaks text={complaintsolution} />
        </p>
      </main>
    </div>
  );
}
