import { it, expect, describe } from 'vitest';
import UsersDataTable from '../../src/components/AdminComponents/UserDataTable.jsx'; // Assurez-vous de corriger le chemin
import { render, screen } from "@testing-library/react";
import React from 'react';
import { Provider } from 'react-redux';
import store from "../../src/store"; // Assurez-vous que le chemin est correct

describe('UsersDataTable', () => {
    it('should render the user data table with correct user data', async () => {
        // Données fictives utilisées pour le test
        const mockUsers = [
            { _id: '1', name: 'John Doe', email: 'john@example.com', blocked: false },
            { _id: '2', name: 'Jane Smith', email: 'jane@example.com', blocked: true },
        ];

        // Rendu du composant avec les données fictives
        await render(
            <Provider store={store}>
                <UsersDataTable users={mockUsers} />
            </Provider>
        );

        // Récupération de toutes les cellules du tableau
        const tableCells = screen.getAllByRole('cell');

        // Vérification du nombre de cellules rendues
        expect(tableCells.length).toBe(mockUsers.length * 7); // 7 colonnes attendues pour chaque utilisateur

        // Vérification de la présence des données utilisateur dans les cellules du tableau
        mockUsers.forEach((user, index) => {
            const rowIndex = index + 1;
            expect(screen.queryByText(`${rowIndex}`)).toBeTruthy(); // Vérifie la présence de l'index de ligne
            expect(screen.queryByText(user.name)).toBeTruthy(); // Vérifie la présence du nom de l'utilisateur
            expect(screen.queryByText(user.email)).toBeTruthy(); // Vérifie la présence de l'email de l'utilisateur
            expect(screen.queryByText(user.blocked ? "☒" : "☑")).toBeTruthy(); // Vérifie la présence de l'état bloqué/débloqué de l'utilisateur
        });
    });

    // Ajoutez d'autres tests selon vos besoins
});
