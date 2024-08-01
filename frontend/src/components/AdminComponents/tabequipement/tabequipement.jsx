import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useGetTabEquipementMutation } from '../../../slices/adminApiSlice';

const EquipmentTable = () => {
    const [equipments, setEquipments] = useState([]);
    const [getTabEquipement] = useGetTabEquipementMutation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseFromApiCall = await getTabEquipement();
                const usersArray = responseFromApiCall.data.usersData;
                //console.log(usersArray); // Vérifiez la structure des données ici
                setEquipments(usersArray);
                setIsLoading(false); // Arrêter le chargement
            } catch (err) {
                toast.error(err?.data?.errors[0]?.message || err);
                //console.error("Error fetching teams:", err);
                setError(err); // Mettre à jour l'erreur
                setIsLoading(false); // Arrêter le chargement
            }
        };
    
        fetchData();
    }, [getTabEquipement]);
    

    if (isLoading) return <p>Loading...</p>; // Afficher un message de chargement
    if (error) return <p>Error: {error.message}</p>; // Afficher un message d'erreur

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Equipment</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Special Request</th>
                </tr>
            </thead>
            <tbody>
            {equipments.map((equipment, index) => (
                <tr key={equipment.id || index}>
                    <td>{equipment.equipment}</td>
                    <td>{equipment.equipment_size}</td>
                    <td>{equipment.equipment_type}</td>
                    <td>{equipment.special_Request}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EquipmentTable;
