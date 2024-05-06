import { useEffect,useState } from "react";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { MenuListCustomer,MenuListAdmin,Menu } from "@/Data/DataMenu"
import { useSession } from 'next-auth/react';
import { Roles } from "@/enums/Roles";



interface SidebarProps {
    open: boolean;
    onAsideToggle: ( open:boolean ) => void;
  }

 export const Sidebar: React.FC<SidebarProps> = ({ open, onAsideToggle }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menu,setMenu] = useState<Menu[]>();

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if ( screenWidth < 640 ){
        onAsideToggle(!open);
    }
  }

  useEffect(() => {
    if ( session?.user ){
        const { role } = session?.user as any;

        if ( role == Roles.ADMIN ){
            setMenu(MenuListAdmin);
        }else if ( role == Roles.CUSTOMER ){
            setMenu(MenuListCustomer);
        }   
    }
  }, [session]);    
  return (
    <>
        <aside className={` ${ open ? " ml-0":" -ml-32"} sidebar`}>
            <div className=" relative  overflow-y-auto overflow-x-hidden flex flex-col">
                {
                    menu?.length &&
                    menu.map( ( element,index ) => {
                        const Icon = element.icon as any;
                        return (
                            <Link href={element.link} className="p-5 text-center border-b border-gray-300" key={index} onClick={ () => { handleClick() } } >
                                <button className={` flex flex-col items-center mx-auto hover:text-blue-600 ${ element.link == pathname ? "text-blue-600" : "" }`} >
                                    <span>
                                        <Icon className=" w-8 h-8" />
                                    </span>
                                    <span className=" text-sm">{element.title}</span>
                                </button>
                            </Link>
                        )
                    })
                }
            </div>
        </aside>
        <div className={` ${ open ? " block" : " hidden"} absolute w-full min-h-screen h-full bg-black bg-opacity-30 z-20 sm:hidden`}></div>
    </>
  )
}

