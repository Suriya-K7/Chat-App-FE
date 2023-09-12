import { useContext, useState } from "react";
import Register from "./pages/register/Register";
import "./App.css";
import DataContext from "./context/DataContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Forgot from "./pages/forgot/Forgot";
import Chat from "./pages/chat/Chat";
import ReportBug from "./pages/ReportBug/ReportBug";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editprofile/EditProfile";
import Logout from "./pages/logout/Logout";
import Reset from "./pages/reset/Reset";
import ConfirmUser from "./pages/confirmUser/ConfirmUser";

function App() {
  const { loggedUser } = useContext(DataContext);
  return (
    <>
      <Routes>
        {!loggedUser && (
          <>
            <Route
              path='/'
              element={<Login />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/forgot'
              element={<Forgot />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/resetpassword/:id'
              element={<Reset />}
            />
            <Route
              path='/confirm/:id'
              element={<ConfirmUser />}
            />
            <Route
              path='/*'
              element={<Logout />}
            />
          </>
        )}
        {loggedUser && (
          <>
            <Route
              path='/'
              element={<Chat />}
            />
            <Route
              path='/chat'
              element={<Chat />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/reportbug'
              element={<ReportBug />}
            />
            <Route
              path='/editProfile'
              element={<EditProfile />}
            />
            <Route
              path='/*'
              element={<Logout />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
