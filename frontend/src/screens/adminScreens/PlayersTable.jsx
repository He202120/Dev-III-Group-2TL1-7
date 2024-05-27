import Example from "../../components/AdminComponents/CompoTable/TableJoueurs";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetPlayersDataMutation } from "../../slices/adminApiSlice";

import Loader from "../../components/Loader";


const TableDataPlayers = () => {

  const [usersData, setUsersData] = useState([]);

  const [usersDataFromAPI, { isLoading } ] = useGetPlayersDataMutation();

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
    <div>
      { isLoading ? <Loader/> : <Example users={usersData} /> }
    </div>
  );
};

export default TableDataPlayers;
