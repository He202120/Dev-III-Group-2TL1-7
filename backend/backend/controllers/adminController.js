//? ===================================================== Admin Controller =====================================================

// ===================== Importing necessary modules/files =====================
import asyncHandler from "express-async-handler";
import AdminModel from "../models/adminModel.js";
import TeamModel from "../models/teamModel.js"
import Selection from "../models/selectionModel.js"
import User from "../models/userModel.js"
import Team from "../models/teamModel.js"
//ajout dimitri
import EvenementModel from "../models/evenementModels.js";


import { BadRequestError, NotAuthorizedError, NotFoundError } from "base-error-handler";

import generateAuthToken from "../utils/jwtHelpers/generateAuthToken.js";
import destroyAuthToken from "../utils/jwtHelpers/destroyAuthToken.js";
import sendMail from "../utils/EmailSender/mail.js";

import {
  fetchAllUsers,
  updateUser,
  blockUserHelper,
  unBlockUserHelper,
  fetchAllPlayers,
  fetchAllFormation,
  updatePositionFetch,
  //ajout dimitri
  fetchAgenda,
} from "../utils/adminHelpers.js";

const authAdmin = asyncHandler(async (req, res) => {
  /*
     # Desc: Auth user/set token
     # Route: POST /api/v1/admin/auth
     # Access: PUBLIC
    */

  const { email, password } = req.body;

  if (!email || !password) {

    // If email or password is empty, return error
    throw new BadRequestError("Email and password must be provided.");

  }

  // Find the user in Db with the email and password
  const admin = await AdminModel.findOne({ email: email });

  let passwordValid = false;

  if (admin) {
    passwordValid = await admin.matchPassword(password);
  }

  if (passwordValid) {
    // If user is created, send response back with jwt token

    generateAuthToken(res, admin._id, admin.email); // Middleware to Generate token and send it back in response object

    const verifiedAdminData = {
      name: admin.name,
      email: admin.email,
    };

    res.status(200).json(verifiedAdminData);
  }

  if (!admin || !passwordValid) {
    // If user or user password is not valid, send error back

    throw new BadRequestError("Invalid Email or Password - Admin authentication failed.");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  /*
     # Desc: Register new user
     # Route: POST /api/v1/admin/auth
     # Access: PUBLIC
    */

  const { name, email, password, adminRegistrationKey } = req.body;

  if (!email || !password) {
    
    // If email or password is empty, return error
    throw new BadRequestError("Email or Password is missing in the request - Admin registration failed.");
  }

  if (!adminRegistrationKey) {
    
    // If adminRegistrationKey is empty, return error
    throw new BadRequestError("No Admin Registration Access Code - Admin registration aborted.");
    
  } else {
    
    // Check if Admin registration key is valid
    if (process.env.ADMIN_REGISTRATION_KEY !== adminRegistrationKey) {

      throw new NotAuthorizedError();

    }
  }

  // Check if user already exist
  const userExists = await AdminModel.findOne({ email });

  // If the user already exists, throw an error
  if (userExists) {

    throw new BadRequestError("Admin already exists.");

  }

  // Store the user data to DB if the user dosen't exist already.
  const user = await AdminModel.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    // If user is created, send response back with jwt token

    generateAuthToken(res, user._id, user.email); // Middleware to Generate token and send it back in response object

    const registeredUserData = {
      name: user.name,
      email: user.email,
    };

    res.status(201).json(registeredUserData);
  } else {

    // If user was NOT Created, send error back
    throw new BadRequestError("Invalid data - Admin registration failed.");

  }
  
});

const logoutAdmin = asyncHandler(async (req, res) => {
  /*
     # Desc: Logout user / clear cookie
     # Route: POST /api/v1/admin/logout
     # Access: PUBLIC
    */

  destroyAuthToken(res);

  res.status(200).json({ message: "Admin Logged Out" });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  /*
     # Desc: Get user profile
     # Route: GET /api/v1/admin/profile
     # Access: PRIVATE
    */

  const user = {
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  /*
     # Desc: Update Admin profile
     # Route: PUT /api/v1/admin/profile
     # Access: PRIVATE
    */

  // Find the user data with user id in the request object
  const admin = await AdminModel.findById(req.user._id);

  if (admin) {
    // Update the admin-user with new data if found or keep the old data itself.
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    // If request has new password, update the user with the new password
    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdminData = await admin.save();

    // Send the response with updated user data
    res.status(200).json({
      name: updatedAdminData.name,
      email: updatedAdminData.email,
    });

  } else {

    // If requested admin was not found in db, return error
    throw new NotFoundError();
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const usersData = await fetchAllUsers();

  if (usersData) {

    res.status(200).json({ usersData });

  } else {

    throw new NotFoundError();

  }

});

//Charlier Martin

const getAllPlayers = asyncHandler(async (req, res) => {
  const usersData = await fetchAllPlayers();

  if (usersData) {

    res.status(200).json({ usersData });

  } else {

    throw new NotFoundError();

  }
});

const setFormationTeam = asyncHandler(async (req, res) => {
  /*
     # Desc: Register new team
     # Route: POST /api/v1/admin/set-team
     # Access: PUBLIC
    */

  const {name, formation, team } = req.body;

  // Vérification des champs requis
  if (!formation || !team) {
    res.status(400);
    throw new Error('Please provide both formation and team');
  }

  try {
    // Store the team data to DB
    const newTeam = await TeamModel.create({
      name: name,
      formation: formation,
      team: team,
    });

    res.status(201).json({
      message: 'Team registered successfully'
    });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to register team');
  }
});

const getFormationTeam = asyncHandler(async (req, res) => {
  const usersData = await fetchAllFormation();

  if (usersData) {

    res.status(200).json({ usersData });

  } else {

    throw new NotFoundError();

  }
});

const setSelectionTeam = asyncHandler(async (req, res) => {
  /*
     # Desc: Register new team
     # Route: POST /api/v1/admin/set-formation
     # Access: PUBLIC
    */

  const { name, formation, team } = req.body;

  // Vérification des champs requis
  if (!formation || !team) {
    res.status(400);
    throw new Error('Please provide both formation and team');
  }

  try {
    // Supprimer toutes les formations existantes
    await Selection.deleteMany({});

    // Enregistrer la nouvelle formation
    const newTeam = await Selection.create({
      name: name,
      formation: formation,
      team: team,
    });

    res.status(201).json({
      message: 'Selection registered successfully'
    });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to register a selection');
  }
});

const updatePosition = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const position = req.body.position;


  if (!userId || !position) {
    throw new BadRequestError("Player position not received in request - Player Position update failed.");
  }

  const userData = { userId: userId, position: position };

  const usersUpdateStatus = await updatePositionFetch(userData);

  if (usersUpdateStatus.success) {
    const response = usersUpdateStatus.message;

    res.status(200).json({ message: response });
  } else {

    throw new BadRequestError("User update failed.");
    
  }
});

const deleteUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User blocking failed.");
  }

  const deletedUser = await User.findByIdAndDelete(userId)

  if (deletedUser) {
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    throw new BadRequestError("User not found or already deleted.");
  }

});

const deleteTeamData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User blocking failed.");
  }

  const deletedUser = await Team.findByIdAndDelete(userId)

  if (deletedUser) {
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    throw new BadRequestError("User not found or already deleted.");
  }

});

//FIN DU RAJOUT PAR MARTIN

// ajout dimitri
const getAgenda = asyncHandler(async (req, res) => {
  const usersData = await fetchAgenda();

  if (usersData) {

    res.status(200).json({ usersData });

  } else {

    throw new NotFoundError();

  }
});

const setAgenda = asyncHandler(async (req, res) => {
  /*
     # Desc: Register new team
     # Route: POST /api/v1/admin/set-agenda
     # Access: PRIVATE
    */

  const {evenements, date_start, date_end } = req.body;

  // Vérification des champs requis
  if (!date_start || !date_end) {
    res.status(400);
    throw new Error('Please provide both date_start and date_end');
  }

  try {
    // Store the team data to DB
    const newTeam = await EvenementModel.create({
      evenements: evenements,
      date_start: date_start,
      date_end: date_end,
    });

    res.status(201).json({
      message: 'Evenement registered successfully'
    });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to register Evenement');
  }
});
// fin ajout 

const blockUser = asyncHandler(async (req, res) => {

  const userId = req.body.userId;

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User blocking failed.");
  }

  const userBlockingProcess = await blockUserHelper(userId);

  const responseMessage = userBlockingProcess.message;

  if (userBlockingProcess.success) {

    res.status(201).json({ message: responseMessage });

  } else {

    throw new BadRequestError(responseMessage);
  }
});

const unBlockUser = asyncHandler(async (req, res) => {

  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const position = req.body.position

  if (!userId) {
    throw new BadRequestError("UserId not received in request - User Un-blocking failed.");
  }

  const userUnblockingProcess = await unBlockUserHelper(userId);

  const responseMessage = userUnblockingProcess.message;

  if (userUnblockingProcess.success) {
    await sendMail(email, name, position, true);
    res.status(201).json({ message: responseMessage });

  } else {

    throw new BadRequestError(responseMessage);
  }
});

const updateUserData = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;

  if (!userId || !name || !email) {
    throw new BadRequestError("User data not received in request - User update failed.");
  }

  const userData = { userId: userId, name: name, email: email };

  const usersUpdateStatus = await updateUser(userData);

  if (usersUpdateStatus.success) {
    const response = usersUpdateStatus.message;

    res.status(200).json({ message: response });
  } else {

    throw new BadRequestError("User update failed.");
    
  }
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  blockUser,
  unBlockUser,
  updateUserData,
  getAllPlayers,
  setFormationTeam,
  getFormationTeam,
  setSelectionTeam,
  updatePosition,
  deleteUserData,
  deleteTeamData,
  //ajout dimitri
  getAgenda,
  setAgenda,
};
