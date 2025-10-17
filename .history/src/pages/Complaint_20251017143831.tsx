type ComplaintProps = {
  complaintTitle: string;
  complaintText: string;
  numComplaints: string | number;
  complaintPercent: string | number;
};

export default function Complaint({
  complaintTitle,
  complaintText,
  numComplaints,
  complaintPercent,
}: ComplaintProps) {
  return (
    <>
      <body>
        <header>
          <button onClick={() => window.history.back()}>Voltar</button>
          <h1>Recomendações</h1>
        </header>

        <aside>
          <h2>Informações Adicionais:</h2>
          <p>Número de Reclamações: {numComplaints}</p>
          <p>
            Percentual de Reclamações em relação ao total: {complaintPercent}
          </p>
        </aside>

        <main>
          <h1>{complaintTitle}</h1>
          <h2>Recomendações:</h2>
          <p>{complaintText}</p>
        </main>
      </body>
    </>
  );
}