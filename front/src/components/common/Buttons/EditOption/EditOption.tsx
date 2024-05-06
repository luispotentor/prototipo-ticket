import { PencilIcon } from "@heroicons/react/24/solid"

interface PropsEditOption  {
    clickFunc?: ( opton:any ) => void;
}

export const EditOption:React.FC<PropsEditOption> = ( {clickFunc}) => {

  return (
    <div className=" p-2 rounded-lg cursor-pointer hover:bg-indigo-600 " onClick={clickFunc}>
        <PencilIcon className=" w-4 h-4 text-indigo-300" />
    </div>
  )
}
