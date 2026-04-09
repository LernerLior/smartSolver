import '../styles/graphics.css';
import LineC from '../components/Graphic_line';
import Pie from '../components/Graphic_pie';


export default function PageGraphics() {

  return (
<div className="layout2">
	
      <header className="cab">
      	<h2>Gráficos</h2>
      </header>


	<main className="main2">
		<section className="graph2">	
      			<LineC />
      		</section>

		<section className="graph2">	
			<Pie />
      		</section>

      	</main>



</div>
  );
}
