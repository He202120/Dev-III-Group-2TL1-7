import { useState, useEffect } from "react";
import axios from 'axios';
import DataTable from "@/components/DataTable";
import DataLine from "@/components/DataTable/DataLine";
import DataLineCell from "@/components/DataTable/DataLineCell";
import DataHeader from "@/components/DataTable/DataHeader";
import DataHeadCol from "@/components/DataTable/DataHeadCol";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function useGestionJoueurs() {
    const [postulants, setPostulants] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPostulants = axios.get('https://rfc-wetteren-api.onrender.com/postulants');
        const fetchPlayers = axios.get('https://rfc-wetteren-api.onrender.com/players');

        Promise.all([fetchPostulants, fetchPlayers])
            .then(([postulantsResponse, playersResponse]) => {
                setPostulants(postulantsResponse.data);
                setPlayers(playersResponse.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return { postulants, players };
}

function Postulants({ postulants }) {
    return (
        <div className="w-full lg:w-3/4 mx-auto">
            <div className="p-4 flex">
                <h1 className="text-3xl font-semibold">Joueurs en attente</h1>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-sm">
                    <div className="flex items-center space-x-2">
                        <Input type="text" placeholder="Rechercher" />
                        <Select>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Filtrer par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="firstname">Prénom</SelectItem>
                                    <SelectItem value="lastname">Nom</SelectItem>
                                    <SelectItem value="birthDate">Date de naissance</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Téléphone</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Subscribe</Button>
                    </div>
                </div>
            </div>
            <DataTable>
                <DataHeader>
                    <DataHeadCol col="Nom" />
                    <DataHeadCol col="Prénom" />
                    <DataHeadCol col="Date de naissance" />
                    <DataHeadCol col="Téléphone" />
                    <DataHeadCol col="Email" />
                    <DataHeadCol col="Présentation" />
                    <DataHeadCol col="" />
                </DataHeader>
                {postulants.map((postulant, index) => (
                    <DataLine key={index}>
                        <DataLineCell>
                            <h1>{postulant.lastName}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{postulant.firstName}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(postulant.dateOfBirth))}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{postulant.email}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{postulant.phone}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{postulant.description}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <Button className="bg-red-600 mr-5 hover:bg-red-700">Rejeter</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">Accepter</Button>
                        </DataLineCell>
                    </DataLine>
                ))}
            </DataTable>
        </div>
    );
}

function Players({ players }) {
    return (
        <div className="w-full lg:w-3/4 mx-auto">
            <div className="p-4 flex">
                <h1 className="text-3xl font-semibold">Joueurs acceptés</h1>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-sm">
                    <div className="flex items-center space-x-2">
                        <Input type="text" placeholder="Rechercher" />
                        <Select>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Filtrer par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="firstname">Prénom</SelectItem>
                                    <SelectItem value="lastname">Nom</SelectItem>
                                    <SelectItem value="birthDate">Date de naissance</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Téléphone</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Subscribe</Button>
                    </div>
                </div>
            </div>
            <DataTable>
                <DataHeader>
                    <DataHeadCol col="Nom" />
                    <DataHeadCol col="Prénom" />
                    <DataHeadCol col="Date de naissance" />
                    <DataHeadCol col="Téléphone" />
                    <DataHeadCol col="Email" />
                    <DataHeadCol col="" />
                </DataHeader>
                {players.map((player, index) => (
                    <DataLine key={index}>
                        <DataLineCell>
                            <h1>{player.lastName}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{player.firstName}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(player.dateOfBirth))}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{player.email}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <h1>{player.phone}</h1>
                        </DataLineCell>
                        <DataLineCell>
                            <Button className="bg-red-600 mr-5 hover:bg-red-700">Supprimer</Button>
                        </DataLineCell>
                    </DataLine>
                ))}
            </DataTable>
        </div>
    );
}

const GestionJoueurs = () => {
    const { postulants, players } = useGestionJoueurs();

    return (
        <div>
            <Postulants postulants={postulants} />
            <Players players={players} />
        </div>
    );
}

export default GestionJoueurs;


























