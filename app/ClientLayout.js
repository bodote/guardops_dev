'use client'
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function App({  children }) {
  return (
    <UserProvider>
     <>{children}</> 
      <ToastContainer />
    </UserProvider>
  );
}