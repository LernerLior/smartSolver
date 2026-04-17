import '../styles/graphics.css';
import ImportantComplaint from '../components/ImportantComplaint';

export default function ImportantComplaints() {
  return (
    <div className="layout2">
      <header className="cab">
        <h2>Gráficos</h2>
      </header>

      <main className="main2">
	<p>area</p>
        <ImportantComplaint complaint_title = "Teste de título"/>
      </main>

    </div>
  );
}
