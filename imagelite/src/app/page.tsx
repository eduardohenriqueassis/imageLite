'use client'
import { useAuth } from "@/resources";
import LoginPage from "./login/page";
import GaleryPage from "./galery/page";
export default function Home() {
  const auth = useAuth();
  const user = auth.getUserSession()
  return (
    user ? <GaleryPage /> : <LoginPage /> 
  )
}
