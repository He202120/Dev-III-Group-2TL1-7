import React from 'react';
import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "../../src/store"; // Assurez-vous que le chemin est correct
import Liste_evenement from '../../src/components/AdminComponents/AgendaTable/agendData'; // Assurez-vous que le chemin est correct

describe('Liste_evenement component', () => {
    beforeEach(async () => {
        // Rendu du composant avec Vitest
        render(
            <Provider store={store}>
                <Liste_evenement />
            </Provider>
        );

        // Attente que le composant se rende
        await screen.findAllByLabelText('Start date');
    });

    it('should display the form', async () => {
        // Sélectionner le formulaire
        const form = screen.getByTestId('fortest');

        // Vérifier que le form existe et contient le contenu attendu
        expect(form).not.toBeNull();

    });

    it('should fill out and submit the form', async () => {
        // Sélectionner les champs du formulaire
        const startDateInputs = screen.getAllByLabelText('Start date');
        const endDateInputs = screen.getAllByLabelText('End date');
        const eventInputs = screen.getAllByLabelText('Event');
    
        const submitButtons = screen.getAllByRole('button', { name: /Add to calendar/i });
        const submitButton = submitButtons.find(button => button.textContent === 'Add to calendar');
    
        // Simuler des dates incorrectes (dateEnd antérieur ou égal à dateStart)
        fireEvent.change(startDateInputs[0], { target: { value: '06/09/2024 12:00 PM' } });
        fireEvent.change(endDateInputs[0], { target: { value: '06/09/2024 10:00 AM' } });
        fireEvent.change(eventInputs[0], { target: { value: 'Meeting with team' } });
    
        fireEvent.click(submitButton);
    
        // Attendre un peu avant de vérifier si le message d'erreur est présent
        setTimeout(() => {
            expect(screen.queryByText('Wrong date value.')).toBeTruthy();
        }, 1000); // Attendre 1 seconde
    });

    it()
});