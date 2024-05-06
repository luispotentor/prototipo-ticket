import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export const Navigation: React.FC = () => {

    const [isOpen,setIsOpen] = useState(false);
    return (
        <div>
            <Navbar isAsideOpen={isOpen} onAsideToggle={ () => setIsOpen(!isOpen) }  />
            <Sidebar open={isOpen} onAsideToggle={ () => setIsOpen(!isOpen) } />
        </div>
    )
}
