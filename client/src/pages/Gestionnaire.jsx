//Components
import Liste_membre from '@components/Gestion/Liste_membre.jsx'
import Liste_attente from '@components/Gestion/Liste_attente.jsx'

//React router
import { useNavigate } from 'react-router-dom'

//CSS
import '@/css/Gestionnaire.css'

function Gestionnaire(){

    const getInscription = () => {
        useNavigate("/gestionnaire_inscription", {replace : true});
    }

    return (
        <>
            <Liste_membre />
            <Liste_attente />
            <a href="/gestionnaire_inscription">Inscription</a>
        </>
    );
}

export default Gestionnaire