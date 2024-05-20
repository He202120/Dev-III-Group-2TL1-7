import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import NavBar from "@/components/NavBar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; 
import { useState, useEffect } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Component() {
  const token = Cookies.get('token'); 
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    oldPassword: '',
    newPassword: '',
    email: '',
    phone: '',
    bio: ''
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rfc-wetteren-api.onrender.com/users/${userId}`, config);
        setUserData(response.data);
        setFormValues({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          bio: response.data.bio || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!reEmail.test(formValues.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    const rePhone = /^\+\d{2}( ?\d{3})( ?\d{2})( ?\d{2})( ?\d{2})$/;
    if (!rePhone.test(formValues.phone)) {
      setError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    try {
      const response = await axios.patch(`https://rfc-wetteren-api.onrender.com/users/${userId}`, formValues, config);
      setUserData(response.data);
      setSuccess("Vos informations ont été mises à jour avec succès.");
      setError("");
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <>
    <NavBar />
    <div className="mt-5 mb-5 mx-5">
        <h1 className="text-xl font-semibold">Mon profil</h1>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
    </div>
    <hr />
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
                to="/account/dashboard"><HomeIcon className="h-4 w-4"/>Acceuil</Link>
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="/account/profile"><UsersIcon className="h-4 w-4" />Profil</Link>
            </nav>
          </div>
        </div>
      </div>
    <div className="mt-5 mb-5 mx-5">
        {error && (
          <Alert variant="destructive" className="w-[810px] mb-5">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="w-[810px] mb-5">
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
            <div className="flex space-x-2">
                <div className="w-1/3 space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input name="firstName" id="firstName" placeholder="Zinedine" value={formValues.firstName} onChange={handleChange} />
                </div>

                <div className="w-1/3 space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input name="lastName" id="lastName" placeholder="Zidane" value={formValues.lastName} onChange={handleChange} />
                </div>
            </div>
            <div className="flex space-x-2 mt-4">
                <div className="w-1/3 space-y-2">
                <Label htmlFor="oldPassword">Ancien mot de passe</Label>
                <Input type="password" name="oldPassword" id="oldPassword" placeholder="*********" value={formValues.oldPassword} onChange={handleChange} />
                </div>

                <div className="w-1/3 space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input type="password" name="newPassword" id="newPassword" placeholder="*********" value={formValues.newPassword} onChange={handleChange} />
                </div>
            </div>
            <div className="space-x-2 mt-4">
                <div className="w-1/2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" placeholder="email@example.com" value={formValues.email} onChange={handleChange} />
                </div>
            </div>
            <div className="space-x-2 mt-4">
                <div className="w-1/2 space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input name="phone" id="phone" placeholder="+32 654 78 92" value={formValues.phone} onChange={handleChange} />
                </div>
            </div>
            <div className="space-x-2 mt-4">
                <div className="w-1/2 space-y-2">
                    <Label htmlFor="bio">Présente-toi</Label>
                    <Textarea name="bio" id="bio" placeholder="Poste(s), projet(s), ancien(s) club(s) ..." value={formValues.description} onChange={handleChange} />
                </div>
            </div>
            <Button type="submit" variant="rfc" className="mt-10">Mettre à jour</Button>
        </form>
    </div>
    </div>
    </>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}














