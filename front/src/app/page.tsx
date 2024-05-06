"use client"

import { SessionProvider } from "next-auth/react";
import { Redirect } from "@/components/Redirect";

export default function Home() {
  return (
    <SessionProvider>
      <Redirect>
        <main className="flex min-h-screen flex-col justify-between">
          <div>Cargando...</div>
        </main>
      </Redirect>
    </SessionProvider>
  );
}
