import DisplayFormSelected from "../../components/UserComponents/DisplaySelection";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDisplaySelectionUserMutation } from "../../slices/userApiSlice";
import Loader from "../../components/Loader";

const DisplayFormation = () => {
    const [usersData, setUsersData] = useState([]);
    const [usersDataFromAPI, { isLoading }] = useDisplaySelectionUserMutation();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const responseFromApiCall = await usersDataFromAPI();
                const usersArray = responseFromApiCall.data.usersData;
                setUsersData(usersArray);
            };

            fetchData();
        } catch (err) {
            toast.error(err?.data?.errors[0]?.message || err);
            console.error("Error fetching teams:", err);
        }
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Team Selected for the Match</h1>
            {isLoading ? <Loader /> : <DisplayFormSelected users={usersData} />}
        </div>
    );
};

export default DisplayFormation;
