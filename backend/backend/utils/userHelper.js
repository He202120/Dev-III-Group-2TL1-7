import Selection from "../models/selectionModel.js";
import Evenement from "../models/evenementModels.js"

const fetchSelection = async () => {
    try {
      const users = await Selection.find({}, { name: 1, formation: 1, team: 1 });
  
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
  
      throw error;
    }
  };

  
const fetchAgenda = async () => {
  try {
    const timetable = await Evenement.find({}, { date_start: 1, date_end: 1, evenements: 1 }); 

    return timetable;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

  export { fetchSelection, fetchAgenda };

