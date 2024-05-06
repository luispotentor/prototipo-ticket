"use client"

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Navigation } from "@/components/Navigation";

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
      <div className="flex">
        <Navigation />
        <main className="flex min-h-screen flex-1 flex-col justify-between container py-24 mx-auto px-3">
            {children}
          <ToastContainer />
        </main>
      </div>
    </SessionProvider>
  )
}

export default AdminLayout