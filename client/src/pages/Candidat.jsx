import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return null;
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
  });

  const [error, setError] = useState("");
  
  useEffect(() => {
    const token = getCookie("token"); 
    if (token) {
      navigate("/account/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!reEmail.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    const rePhone = /^\+\d{2}( ?\d{3})( ?\d{2})( ?\d{2})( ?\d{2})$/;
    if (!rePhone.test(formData.phone)) {
      setError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      const response = await axios.post("https://rfc-wetteren-api.onrender.com/users", formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        password: "",
      });
      console.log(response.data);
      navigate("/auth/login");
      console.log(response.data);
    } catch (error) {
      setError("Le numéro de téléphone ou l'adresse mail est déjà utilisée.");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {error && (
        <Alert variant="destructive" className="w-[350px] mb-5">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>S'inscrire</CardTitle>
            <CardDescription>Entrez vos informations pour vous inscrire</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">Prénom <span className="text-red-600">*</span></Label>
                  <Input id="firstname" name="firstName" value={formData.firstName} required onChange={handleChange} placeholder="John" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Nom <span className="text-red-600">*</span></Label>
                  <Input id="lastname" name="lastName" value={formData.lastName} required onChange={handleChange} placeholder="Doe"/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Adresse mail <span className="text-red-600">*</span></Label>
                  <Input id="email" name="email" value={formData.email} required onChange={handleChange} placeholder="email@example.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Numéro de téléphone <span className="text-red-600">*</span></Label>
                  <Input id="phone" name="phone" value={formData.phone} required onChange={handleChange} placeholder="+32 123 45 67 89" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="dateOfBirth">Date de naissance <span className="text-red-600">*</span></Label>
                  <Input id="dateOfBirth" type="date" name="dateOfBirth" value={formData.dateOfBirth} required onChange={handleChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Mot de passe <span className="text-red-600">*</span></Label>
                  <Input type="password" id="password" name="password" required value={formData.password} onChange={handleChange}  placeholder="**********" />
                </div>
                <p className="text-sm"><span className="text-red-600">*</span> champ obligatoire</p>
              </div>
              <Button type="submit" variant="rfc" className="w-full mt-5 m">S'inscrire</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;















