import { it, expect, describe } from 'vitest'
import { render, screen } from "@testing-library/react"
import AdminProfileScreen from "../../src/screens/adminScreens/ProfileScreen.jsx"
import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/vitest'
import store from "../../src/store"; // Importez votre magasin Redux

describe('AdminProfileScreen', () => {
    it('should afficher une fenetre lors de la modification', () => {
        render(
            <Provider store={store}>
                <AdminProfileScreen/>
            </Provider>
        )

        // Vérifiez si le champ de texte pour le nom est présent
        const nameInput = screen.getByPlaceholderText('Enter name here...');
        expect(nameInput).toBeInTheDocument();

        // Vérifiez si le champ de texte pour le mot de passe est présent
        const passwordInput = screen.getByPlaceholderText('Enter password');
        expect(passwordInput).toBeInTheDocument();

        // Vérifiez si le champ de texte pour la confirmation du mot de passe est présent
        const confirmPasswordInput = screen.getByPlaceholderText('Re-enter password');
        expect(confirmPasswordInput).toBeInTheDocument();

        // Vérifiez si le bouton "Save" est présent
        const saveButton = screen.getByRole('button', { name: /Save/i });
        expect(saveButton).toBeInTheDocument();
    })
})
