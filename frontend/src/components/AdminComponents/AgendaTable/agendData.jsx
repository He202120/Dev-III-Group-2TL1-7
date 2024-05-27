import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetAgendaMutation, useSetEvenementMutation } from "../../../slices/adminApiSlice"; // Importer les mutations
import { toast } from "react-toastify";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Button, Box } from '@mui/material';

function Liste_evenement() {
    const [events, setEvents] = useState([]);
    const formulaireRef = useRef(null); // Référence pour le formulaire
    const [getAgenda] = useGetAgendaMutation(); // Utiliser la mutation pour obtenir les événements
    const [setEvenement] = useSetEvenementMutation(); // Utiliser la mutation pour ajouter un événement

    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [evenement, setEvenementInput] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche la soumission normale du formulaire

        // Vérifier si dateStart est antérieur à dateEnd
        if (dateStart >= dateEnd) {
            toast.error("Wrong date value.");
            return false; // Arrêter la soumission du formulaire
        }

        // Construire l'objet contenant les données à envoyer
        const eventData = {
            date_start: dateStart.toISOString(),
            date_end: dateEnd.toISOString(),
            evenements: evenement
        };

        try {
            const response = await setEvenement(eventData).unwrap();
            // Ajouter le nouvel événement à la liste des événements existants
            setEvents(prevEvents => [...prevEvents, {
                title: eventData.evenements,
                start: dateStart,
                end: dateEnd,
            }]);
            // Réinitialiser les valeurs des champs après la soumission du formulaire
            setDateStart(null);
            setDateEnd(null);
            setEvenementInput('');
            formulaireRef.current.reset();
            toast.success("Événement ajouté avec succès !");
        } catch (err) {
            console.log(err);
            toast.error("Erreur, événement non envoyé");
        }
    };

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
            <form onSubmit={handleSubmit} id='formulaire' ref={formulaireRef} style={{ marginTop: '20px' }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <DateTimePicker
                            label="Start date"
                            value={dateStart}
                            onChange={setDateStart}
                            renderInput={(params) => <TextField {...params} required />}
                        />
                        <DateTimePicker
                            label="End date"
                            value={dateEnd}
                            onChange={setDateEnd}
                            renderInput={(params) => <TextField {...params} required />}
                        />
                        <TextField
                            label="Event"
                            value={evenement}
                            onChange={(e) => setEvenementInput(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add to calendar
                        </Button>
                    </Box>
                </LocalizationProvider>
            </form>
        </div>
    );
}

export default Liste_evenement;
