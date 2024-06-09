import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector, Provider } from "react-redux"; // Importez le Provider depuis react-redux
import { setCredentials } from "../../slices/adminAuthSlice";
import { useUpdateAdminMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import store from "../../store"; // Importez votre magasin Redux

const AdminProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [updateProfile, { isLoading }] = useUpdateAdminMutation();

  useEffect(() => {
    if (adminInfo) {
      setName(adminInfo.name);
      setEmail(adminInfo.email);
    }
  }, [adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        const responseFromApiCall = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...responseFromApiCall }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.errors[0]?.message || err?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          Save{" "}
        </Button>
      </Form>

      {isLoading && <> <Loader /> </>}
    </FormContainer>
  );
};

// Enveloppez votre composant dans le Provider et passez le magasin Redux comme prop
const WrappedAdminProfileScreen = () => (
  <Provider store={store}>
    <AdminProfileScreen />
  </Provider>
);

export default WrappedAdminProfileScreen;
