import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function BackToHomeLink(props) {
    return ( 
        <Link className="backToHomeLink" style={props.style} to="/"> 
                <FontAwesomeIcon icon={faChevronLeft} />
                <FontAwesomeIcon icon={faChevronLeft} />
                Revenir à la page principale
            </Link>
     );
}

export default BackToHomeLink;
