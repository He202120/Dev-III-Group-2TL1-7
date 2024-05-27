import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//? ==================================== User Screens Import ====================================
import PrivateRoutes from "./screens/userScreens/PrivateRoutes.jsx";
import HomeScreen from "./screens/userScreens/HomeScreen.jsx";
import LoginScreen from "./screens/userScreens/LoginScreen.jsx";
import RegisterScreen from "./screens/userScreens/RegisterScreen.jsx";
import ProfileScreen from "./screens/userScreens/ProfileScreen.jsx";
import DisplayFormation from "./screens/userScreens/FormationSelected.jsx"
import DashBoardUser from "./screens/userScreens/Dashboardplayer.jsx"

//? ==================================== Admin Screens Import ====================================
import AdminPrivateRoutes from "./screens/adminScreens/PrivateRoutes.jsx";
import AdminHomeScreen from "./screens/adminScreens/HomeScreen.jsx";
import AdminLoginScreen from "./screens/adminScreens/LoginScreen.jsx";
import AdminRegisterScreen from "./screens/adminScreens/RegisterScreen.jsx";
import AdminProfileScreen from "./screens/adminScreens/ProfileScreen.jsx";
import UsersManagementScreen from "./screens/adminScreens/UsersManagementScreen.jsx";
import TableDataPlayers from "./screens/adminScreens/PlayersTable.jsx"
import TableFormation from "./screens/adminScreens/FormationTable.jsx"
// ajout dimi
import Agenda from "./screens/adminScreens/AgendaTable.jsx"
import AgendaUser from "./screens/userScreens/AgendaTableUser.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* ===================================== User Routes ===================================== */}

      <Route index={true} path="/" element={<HomeScreen />} />

      <Route path="/login" element={<LoginScreen />} />

      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/selection" element={<DisplayFormation />} />

      <Route path="/agenda" element={<AgendaUser />} />

      <Route path="/dashboard" element={<DashBoardUser />} />
      

      {/* USER PRIVATE ROUTES */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* ===================================== Admin Routes ===================================== */}

      <Route path="/admin" element={<AdminHomeScreen />} />

      <Route path="/admin/login" element={<AdminLoginScreen />} />

      <Route path="/admin/register" element={<AdminRegisterScreen />} />

      {/* ADMIN PRIVATE ROUTES */}
      <Route path="" element={<AdminPrivateRoutes />}>
        <Route path="/admin/profile" element={<AdminProfileScreen />} />
        <Route path="/admin/manage-users" element={<UsersManagementScreen />} />
        <Route path="/admin/player-info" element={<TableDataPlayers />} />
        <Route path="/admin/formation" element={<TableFormation />} />
        <Route path="/admin/agenda" element={<Agenda />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
