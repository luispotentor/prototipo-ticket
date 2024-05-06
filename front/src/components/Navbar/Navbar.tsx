
import { Avatar } from "@/components/ui/Avatar";
import { MenuButton } from "@/components/ui/MenuButton";

interface NavbarProps {
            isAsideOpen: boolean;
            onAsideToggle: ( open:boolean ) => void;
          }
          
export const Navbar: React.FC<NavbarProps> = ({ isAsideOpen, onAsideToggle }) => {

  return (
    <nav className="w-full bg-white shadow-lg h-20 py-9 fixed top-0 z-50">
        <div className=" flex justify-between items-center mx-auto px-3 h-full">
            <div className="flex items-center">
                <div onClick={ () => onAsideToggle(!isAsideOpen) }><MenuButton /></div>
                <span className=" ml-1 text-lg font-semibold">Tickets</span>
            </div>
            <div className=" options flex h-full justify-around items-center">
                {/* <div>Boton uno</div> */}
                <div>
                  <Avatar  />
                </div>
            </div>
        </div>
    </nav>
  )
}