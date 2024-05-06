import { useState, useEffect } from "react";
import { PencilIcon} from "@heroicons/react/24/outline"
import { Spinner } from "@/components/common/Spinner";

interface EditButtonProps {
  label?:string;
  actionFunc?: () => void;
  loading?:boolean;
  disabled?:boolean;
  loadingText?:string;
}
export const EditButton:React.FC<EditButtonProps> = ({label = 'Add Button',loadingText = 'Loading...',loading = false,disabled = false,actionFunc}) => {
  
  const [buttonDisabled,setButtonDisabled] = useState(disabled);

  useEffect( () =>{
    setButtonDisabled(loading);
  },[loading]);

  return (
    <button
      onClick={actionFunc}
      disabled={buttonDisabled}
      className={`text-white inline-flex items-center ${ buttonDisabled ? 'bg-blue-300' : 'bg-blue-700 hover:bg-blue-800'}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
    >
      {
        loading ?
         <>
           <Spinner />
           {loadingText}
         </>
        :
        <>
          <PencilIcon className=" w-5 h-5 " strokeWidth={1} />
          {label}
        </>
      }
        
    </button>

  )
}
