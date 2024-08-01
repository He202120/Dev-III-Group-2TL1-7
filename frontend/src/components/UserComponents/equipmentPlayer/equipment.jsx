
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer"; // Assurez-vous d'avoir ce composant
import { useSetUserEquipementMutation } from '../../../slices/userApiSlice';


const EquipmentForm = () => {
    const [equipmente, setEquipment] = useState("");
    const [equipmentSize, setEquipmentSize] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [specialRequest, setSpecialRequest] = useState("");
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [addEquipment, { isLoading }] = useSetUserEquipementMutation ();
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        const responseFromApiCall = await addEquipment({
          equipment: equipmente,
          equipment_size: equipmentSize,
          equipment_type: equipmentType,
          special_Request: specialRequest
        }).unwrap();
        toast.success("Equipment added successfully.");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    };
  
    return (
      <FormContainer>
        <h1>Add New Equipment</h1>
  
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="equipment">
            <Form.Label>Equipment</Form.Label>
            <Form.Select
              value={equipmente}
              onChange={(e) => setEquipment(e.target.value)}
            >
              <option value="">Select Equipment</option>
              <option value="jersey_top_type">Jersey Top</option>
              <option value="jersey_bottom_type">Jersey Bottom</option>
              <option value="shin_guard">Shin Guard</option>
              <option value="socks">Socks</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group className="my-2" controlId="equipmentSize">
            <Form.Label>Equipment Size</Form.Label>
            <Form.Select
              value={equipmentSize}
              onChange={(e) => setEquipmentSize(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="XXS">XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group className="my-2" controlId="equipmentType">
            <Form.Label>Equipment Type</Form.Label>
            <Form.Select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="training">Training</option>
              <option value="match">Match</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group className="my-2" controlId="specialRequest">
            <Form.Label>Special Request</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter special requests here..."
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type="submit" variant="primary" className="mt-3">
            {isLoading ? "Loading..." : "Add Equipment"}
          </Button>
        </Form>
  
        <Row className="py-3">
          <Col>
                    {/*<Link to="/">Back to Home</Link>*/}
          </Col>
        </Row>
      </FormContainer>
    );
  };
  
  export default EquipmentForm;