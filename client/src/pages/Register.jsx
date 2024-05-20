import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Candidat() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    const token = Cookies.get("token"); 
    if (token) {
      navigate("/account/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      const response = await axios.post('https://rfc-wetteren-api.onrender.com/users', formData);
      navigate("/auth/login");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-sm space-y-6 mt-7">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">S'inscrire</h1>
          <p className="text-gray-500 dark:text-gray-400">Entrez vos informations pour vous inscrire.</p>
        </div>
        {error && (
        <Alert variant="destructive" className="w-[385px] mb-5">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className="flex space-x-2">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="firstName">Prénom <span className="text-red-600">*</span></Label>
              <Input name="firstName" id="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="w-1/2 space-y-2">
              <Label htmlFor="lastName">Nom <span className="text-red-600">*</span></Label>
              <Input name="lastName" id="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="email">Email <span className="text-red-600">*</span></Label>
              <Input name="email" id="email" placeholder="example@email.com" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="w-1/2 space-y-2">
                <Label htmlFor="phone">Numéro de téléphone <span className="text-red-600">*</span></Label>
                <Input name="phone" id="phone" type="phone" placeholder="+32 412 25 36" required value={formData.phone} onChange={handleChange} />
            </div>

          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date de naissance <span className="text-red-600">*</span></Label>
            <Input name="dateOfBirth" id="dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe <span className="text-red-600">*</span></Label>
            <Input name="password" id="password" required type="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Présente-toi <span className="text-red-600">*</span></Label>
            <Textarea name="description" id="description" placeholder="Poste, projets, anciens clubs etc ..." required value={formData.description} onChange={handleChange} />
          </div>
          <p><span className="text-red-600">*</span> champs obligatoires</p>
          <Button className="w-full" type="submit" variant="rfc">S'inscire</Button>
        </form>
      </div>
    </>
  )
}














































