import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetTabEquipementMutation, useDeleteEquipmentMutation } from "../../../slices/adminApiSlice";

const EquipmentTable = () => {
    const [equipments, setEquipments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [equipmentIdToDelete, setEquipmentIdToDelete] = useState(null);

    const [getTabEquipement] = useGetTabEquipementMutation();
    const [deleteEquipment, { isLoading: isDeleteLoading }] = useDeleteEquipmentMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseFromApiCall = await getTabEquipement();
                setEquipments(responseFromApiCall.data.usersData);
            } catch (err) {
                toast.error(err?.data?.errors[0]?.message || err);
            }
        };

        fetchData();
    }, [getTabEquipement]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredEquipments = equipments.filter(
        (equipment) =>
            equipment.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            equipment.equipment_size.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async () => {
        try {
            await deleteEquipment({ userId: equipmentIdToDelete });
            toast.success("Equipment Deleted Successfully.");
            setEquipmentIdToDelete(null);
            setShowDeleteConfirmation(false);
            // Rafraîchir les données après suppression
            const responseFromApiCall = await getTabEquipement();
            setEquipments(responseFromApiCall.data.usersData);
        } catch (err) {
            toast.error(err?.data?.errors[0]?.message || err?.error);
        }
    };

    return (
        <>
            <BootstrapForm>
                <BootstrapForm.Group className="mt-3">
                    <BootstrapForm.Label>Search Equipment:</BootstrapForm.Label>
                    <BootstrapForm.Control
                        style={{ width: "500px" }}
                        value={searchQuery}
                        type="text"
                        placeholder="Enter Equipment or Size..."
                        onChange={handleSearch}
                    />
                </BootstrapForm.Group>
            </BootstrapForm>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th> {/* Nouvelle colonne pour l'ID */}
                        <th>Equipment</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Special Request</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEquipments.map((equipment, index) => (
                        <tr key={equipment._id || index}>
                            <td>{equipment._id}</td> {/* Affichage de l'ID */}
                            <td>{equipment.equipment}</td>
                            <td>{equipment.equipment_size}</td>
                            <td>{equipment.equipment_type}</td>
                            <td>{equipment.special_Request}</td>
                            <td>
                                <Button
                                    type="button"
                                    variant="danger"
                                    className="mt-3"
                                    onClick={() => {
                                        setEquipmentIdToDelete(equipment._id);
                                        setShowDeleteConfirmation(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                show={showDeleteConfirmation}
                onHide={() => setShowDeleteConfirmation(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this equipment?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteConfirmation(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={isDeleteLoading}
                    >
                        {isDeleteLoading ? "Deleting..." : "Delete"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EquipmentTable;
