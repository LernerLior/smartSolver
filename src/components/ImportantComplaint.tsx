import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface ComplaintProps{
  complaint_title: string,
  complaint_description: string,
  complaint_importance: number
};


export default function ImportantComplaint(props : ComplaintProps){
	
	

	return (

		<div className="correct-size">
		
			{props.complaint_importance == 5 ? 
			(<div className="complaint-card"><h4>{props.complaint_title}</h4>
			<p className="teste">{props.complaint_description}</p>
			 <button className="read-more-btn" onClick={() => carregarbotao(reclamacao.id)}>
                    		Ler mais e obter recomendações
                  	</button></div>)
			: (<div></div>)
			}
		</div>
		
 	 );


}
