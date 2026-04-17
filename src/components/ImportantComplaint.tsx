
type complaint2Props = {

    "complaint_title": string;
    "complaint_description": string;
    "complaint_creation_date": string;
    "complaint_solution": string;
    "complaint_num": string;
    "complaint_per": string;


}

type complaintProps = {

    "complaint_title": string;


}



export default function ImportantComplaint(props: complaintProps){


	return (

		<div>
			<p>{props.complaint_title}</p>	
		</div>
		
 	 );


}