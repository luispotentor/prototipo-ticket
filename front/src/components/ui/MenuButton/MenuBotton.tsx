import { Bars3Icon} from "@heroicons/react/24/outline"

export const MenuButton: React.FC = () => {
  return (
    <button>
        <Bars3Icon className=" h-8 w-8 text-gray-500 hover:text-blue-600" />
    </button>
  )
}