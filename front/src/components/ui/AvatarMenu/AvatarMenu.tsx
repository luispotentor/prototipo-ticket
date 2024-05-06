import { useState } from "react";
import {UserIcon, ArrowLeftIcon} from "@heroicons/react/24/outline"

import { IUser } from "@/interfaces/IUser";
import { RemoveSession } from "@/services/conexions";

interface AvatarMenuProps {
    toogleFunc?: (show:boolean) => void;
    user:IUser | null,
    setUser: (user:IUser) => void
}

export const AvatarMenu:React.FC<AvatarMenuProps> = ( props ) => {
    const {toogleFunc,user,setUser} = props;
    const [isOpen,setIsOpen] = useState(false); 

    const handlerCloseForm = () => {

        setIsOpen(false);
        if ( toogleFunc ){
            toogleFunc(false);
        }
    
    }


	return (
		<>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className=" py-3 px-4 text-sm text-gray-700">
                    Hola {user?.name}
                </div>
                <div  className="py-1 hover:bg-gray-100">
                    <button
                        onClick={() => setIsOpen(!isOpen )}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700  hover:text-gray-900"
                    >
                        <UserIcon className=" w-5 h-5 mr-1" />
                        Mis Datos
                    </button>
                </div>
                <div  className="py-1 hover:bg-gray-100">
                    <button
                        onClick={RemoveSession}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700  hover:text-gray-900"
                    >
                        <ArrowLeftIcon className=" w-5 h-5 mr-1" />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    )
}