import React from 'react';
import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "../../src/store"; // Assurez-vous que le chemin est correct
import Liste_evenement from '../../src/components/UserComponents/AgendaTable/agendData'; // Assurez-vous que le chemin est correct

describe('Liste_evenement component', () => {
    it('should render and initialize component correctly', async () => {
        // Rendu du composant avec Vitest
        render(
            <Provider store={store}>
                <Liste_evenement />
            </Provider>
        );

        // Après le rendu et l'initialisation, vous pouvez ajouter vos vérifications ici
        // Par exemple, vérifiez si certains éléments sont présents ou si l'état initial est correct
    });
});