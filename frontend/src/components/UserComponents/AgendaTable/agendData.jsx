import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDisplayAgendaUserMutation } from "../../../slices/userApiSlice"; // Importer les mutations
import { toast } from "react-toastify";

function Liste_evenement() {
    const [events, setEvents] = useState([]);
    const formulaireRef = useRef(null); // Référence pour le formulaire
    const [getAgenda] = useDisplayAgendaUserMutation(); // Utiliser la mutation pour obtenir les événements

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAgenda().unwrap();

                // Vérifiez si la réponse contient une clé `usersData` qui est un tableau
                if (response && Array.isArray(response.usersData)) {
                    const eventsData = response.usersData.map(event => ({
                        title: event.evenements,
                        start: new Date(event.date_start), // Convertir la date en objet Date
                        end: new Date(event.date_end), // Convertir la date en objet Date
                    }));
                    setEvents(eventsData);
                } else {
                    console.error("La réponse ne contient pas un tableau d'événements:", response);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [getAgenda]);

    const localizer = momentLocalizer(moment);

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

export default Liste_evenement;
