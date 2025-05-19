import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import { CommunityChallenges } from "./pages/CommunityChallenges";
import { LandingPage } from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/scene" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/community-challenges"
            element={<CommunityChallenges />}
          />
        </Routes>
      </main>
    </>
  );
}
