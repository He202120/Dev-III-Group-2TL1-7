import User from "../models/userModel.js";
import Team from "../models/teamModel.js";
//ajout dimitri 
import Evenement from "../models/evenementModels.js";

const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, blocked: 1, position: 1 });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);

    throw error;
  }
};

const fetchAllPlayers = async () => {
  try {
    const players = await User.find({ blocked: false }, { name: 1, email: 1, position: 1 }); 

    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

const fetchAllFormation = async () => {
  try {
    const teams = await Team.find({}, { name: 1, formation: 1, team: 1}); 

    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

// ajout dimitri 
const fetchAgenda = async () => {
  try {
    const timetable = await Evenement.find({}, { date_start: 1, date_end: 1, evenements: 1 }); 

    return timetable;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
// fin ajout

const blockUserHelper = async (userId) => {
  try {
    // Attempt to find the user by their _id
    const user = await User.findById(userId);

    if (!user) {
      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };
    }

    user.blocked = true;
    // Save the updated user data
    await user.save();

    // If the user was successfully blocked, return a status indicating success
    return { success: true, message: "User blocked successfully." };

  } catch (error) {
    console.error("Error blocking user:", error);

    throw error;
  }
};

const unBlockUserHelper = async (userId) => {
  try {
    // Attempt to find the user by their _id
    const user = await User.findById(userId);

    if (!user) {
      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };
    }

    user.blocked = false;
    // Save the updated user data
    await user.save();

    // If the user was successfully unblocked, return a status indicating success
    return { success: true, message: "User Un-blocked successfully." };

  } catch (error) {
    console.error("Error Un-blocking user:", error);

    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    const user = await User.findById(userData.userId);

    if (!user) {
      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "User not found." };
    }

    // Update user.name and user.email with the new values
    user.name = userData.name;
    user.email = userData.email;

    // Save the updated user data
    await user.save();

    return { success: true, message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const updatePositionFetch = async (userData) => {
  try {
    const user = await User.findById(userData.userId);

    if (!user) {
      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "User not found." };
    }

    // Update user.name and user.email with the new values
    user.position = userData.position;

    // Save the updated user data
    await user.save();

    return { success: true, message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//ajout martin


//ajout dimitri fetchAgenda
export { 
  fetchAllUsers, 
  blockUserHelper, 
  unBlockUserHelper, 
  updateUser, 
  fetchAllPlayers, 
  fetchAllFormation, 
  fetchAgenda, 
  updatePositionFetch,
};
