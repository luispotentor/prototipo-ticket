import { useState,MouseEvent,useRef,useEffect  } from "react";
import { useSession } from 'next-auth/react';

import { AvatarMenu } from "@/components/ui/AvatarMenu";
import { IUser } from "@/interfaces/IUser";


export const Avatar:React.FC = () => {

  const [showMenu,setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const [user,setUser] = useState<IUser | null >(null);  

  const handleClickAvatar = () => {
    setShowMenu(!showMenu);
  }

  

  const closeDropdown = () => {
    setShowMenu(false);
  };

  const handleClickOutside = (event: MouseEvent<Document>) => {
    const dropdownRefCurrent = dropdownRef.current as HTMLDivElement | null;
    if (dropdownRefCurrent && !dropdownRefCurrent.contains(event.target as Node)) {
      closeDropdown();
    }
  };

  useEffect( () =>{

    if ( session?.user ) {
      const {token, ...userSession} = session?.user as any;
      setUser({...userSession ,password:'',confirmPassword:''});
    }
  },[session]);

  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside as any);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleClickAvatar} className=" mx-3 flex items-center justify-center rounded-full border-[2px] border-solid  bg-indigo-400 h-12 w-12 border-gray-800 hover:bg-gray-300">
          <span className=" font-semibold">{user?.name?.slice(0, 1)}{user?.last_name?.slice(0, 1)}</span>
      </button>

      {
        showMenu && (
          <AvatarMenu toogleFunc={setShowMenu} user={user} setUser={setUser} />
        )
      }
      
    </div>
  )
}

