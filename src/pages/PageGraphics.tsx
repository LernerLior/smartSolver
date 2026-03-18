import '../styles/graphics.css';
import { useNavigate, useParams } from 'react-router-dom';
import LineC from './Graphics';
import { useMemo } from 'react';


export default function PageGraphics() {

  return (
<div className="layout2">
	
      <header className="cab">
      	<h2>PageGraphics</h2>
      </header>


	<main className="main2">
		<section className="graph2">	
      			<LineC />
      		</section>
      	</main>



</div>
  );
}
