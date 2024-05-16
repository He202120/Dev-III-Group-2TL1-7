import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import "./agenda.css";

function Liste_evenement() {
    const [events, setEvents] = useState([]);
    const formulaireRef = useRef(null); // Référence pour le formulaire

    useEffect(() => {
        axios.get("https://rfc-wetteren-api.onrender.com/agenda")
            .then(res => {
                const eventsData = res.data.map(event => ({
                    title: event.evenements,
                    start: new Date(event.date_start), // Convertir la date en objet Date
                    end: new Date(event.date_end), // Convertir la date en objet Date
                }));
                setEvents(eventsData);
            })
            .catch(err => console.log(err));
    }, []);

    const localizer = momentLocalizer(moment);

    let admincount = 1;

    const test = (event) => {
        event.preventDefault(); // Empêche la soumission normale du formulaire
        const formData = new FormData(event.target); // Récupère les données du formulaire

        // Récupérer les valeurs des champs date_start et date_end
        const dateStart = new Date(formData.get('date_start'));
        const dateEnd = new Date(formData.get('date_end'));

        // Vérifier si dateStart est antérieur à dateEnd
        if (dateStart >= dateEnd) {
            alert("La date de début doit être antérieure à la date de fin.");
            return false; // Arrêter la soumission du formulaire
        }

        // Construire l'objet contenant les données à envoyer
        const eventData = {
            date_start: dateStart,
            date_end: dateEnd,
            evenements: formData.get('evenements')
        };

        // Envoyer les données à votre backend via une requête POST
        axios.post("https://rfc-wetteren-api.onrender.com/agenda/add", eventData)
            .then(res => {
            })
            .catch(err => console.log(err));
        // Réinitialiser les valeurs des champs après la soumission du formulaire
         formulaireRef.current.reset();
        return false; // Pour empêcher la soumission normale du formulaire
    };

    if (admincount === 1) {
        return (
            <div style={{ height: 500 }}>
                <form onSubmit={test} id='formulaire' ref={formulaireRef}>
                    <label htmlFor="add_date_s">Date de début:</label>
                    <input type="datetime-local" name="date_start" id="add_date_s" required/><br />

                    <label htmlFor="add_date_e">Date de fin:</label>
                    <input type="datetime-local" name="date_end" id="add_date_e" required/><br />

                    <label htmlFor="add_evenements">Événements:</label>
                    <input type="text" name='evenements' id='add_evenements'required/>

                    <input type="submit" value="ajouter au calendrier" />
                </form>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ margin: 'auto', width: '70%' }}
                />
            </div>
        );
    } else {
        return (
            <div style={{ height: 500 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ margin: 'auto', width: '70%' }}
                />
            </div>
        );
    }
}

export default Liste_evenement;
