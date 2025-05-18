import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import Feed from "./pages/Feed";
import NotFoundPage from "./pages/NotFound";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";

export default function App() {
  return (
    <>
      <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
