import { Navigate, Route, Routes } from "react-router-dom"

import SignUpPage from "./pages/auth/signup/SignUpPage"
import LoginPage from "./pages/auth/login/LoginPage"
import HomePage from "./pages/home/HomePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"

import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "./components/common/LoadingSpinner"

function App() {
  // data: authUser if from return value
  const { data: authUser, isLoading, error, isError } = useQuery({
    queryKey: ['authUser'],// เอ้าไว้ refer ถึง Query ตัวนี้ ถ้า component หรือ page ไหนต้องการใช้ จะได้ไม่ต้อง query ใหม่
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if(data.error) {
          return null;
        }

        if(!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }

        // console.log("auth user is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false
  })

  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" /> } />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
