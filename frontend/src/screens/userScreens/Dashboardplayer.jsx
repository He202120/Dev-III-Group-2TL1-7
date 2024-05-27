import PlayerStats from '../../components/UserComponents/Dashboard/PlayerStat';
import React from 'react';
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import { useGetUserPlayersDataMutation } from "../../slices/userApiSlice";

import Loader from "../../components/Loader";

function DashBoardUser(){
    const [usersData, setUsersData] = useState([]);

    const [usersDataFromAPI, { isLoading } ] = useGetUserPlayersDataMutation();
  
    useEffect(() => {
      
      try {
  
        const fetchData = async () => {
  
          const responseFromApiCall = await usersDataFromAPI();
  
          const usersArray = responseFromApiCall.data.usersData;
    
          setUsersData(usersArray);
  
        };
    
        fetchData();
  
      } catch (err) {
  
        toast.error( err?.data?.errors[0]?.message || err );
  
        console.error("Error fetching users:", err);
  
      }
  
    }, []);

    return (
        <>
        {isLoading ? <Loader /> : <PlayerStats users={usersData} />}
      </>
    );
}

export default DashBoardUser