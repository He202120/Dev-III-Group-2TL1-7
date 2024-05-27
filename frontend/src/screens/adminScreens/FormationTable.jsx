import DisplayFormation from "../../components/AdminComponents/Formation/FieldData";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetFormationMutation } from "../../slices/adminApiSlice";

import Loader from "../../components/Loader";


const TableFormation = () => {
    const [usersData, setUsersData] = useState([]);

    const [usersDataFromAPI, { isLoading } ] = useGetFormationMutation();

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

        console.error("Error fetching teams:", err);

    }

    }, []);

    return (
    <div>
        { isLoading ? <Loader/> : < DisplayFormation users={usersData} /> }
    </div>
    );
}
export default TableFormation
