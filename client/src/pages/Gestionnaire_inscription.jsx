import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inscription_type from "@/components/ui/Gestion/Inscription_type";
import '@/css/Gestionnaire_inscription.css'

function Gestionnaire_inscription(){

    return (
        <>
            <Inscription_type />
        </>

    );
}

export default Gestionnaire_inscription;