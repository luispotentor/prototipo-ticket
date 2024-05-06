import { TrashIcon } from "@heroicons/react/24/solid"

interface PropsDeletOption {
    clickFunc?: ( options:any) => void
}
export const DeleteOption:React.FC<PropsDeletOption> = ({clickFunc}) => {
  return (
    <div  className=" p-2 rounded-lg cursor-pointer hover:bg-red-600 " onClick={clickFunc}>
        <TrashIcon className=" w-4 h-4 text-red-300 cursor-pointer" />
    </div>
  )
}
