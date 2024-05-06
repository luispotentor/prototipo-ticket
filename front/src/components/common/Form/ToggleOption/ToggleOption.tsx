import { useState,useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { Spinner } from "@/components/common/Spinner";

type PropsToggle = {
  value?:string;
  name?:string;
  active?:boolean;
  labelActive?:string;
  labelInactive?:string;
  changeFunc?: ( event:ChangeEvent<HTMLInputElement>) => Promise<boolean>;
}
export const ToggleOption:React.FC<PropsToggle> = ({value = 'true',name = 'checkbox',active = false,changeFunc,labelActive = 'Habilitado',labelInactive = 'Deshabilitado'}) => {

  const [isChecked,setIsChecked] = useState(active);
  const [label,setLabel] = useState( active ? labelActive : labelInactive );
  const [loading,setLoading] = useState(false);

  useEffect( () =>{

    const valueLabel = isChecked ? labelActive : labelInactive;
    setLabel(valueLabel);
  },[isChecked]);

  useEffect ( () => {
    setIsChecked(active);
  },[active]);

  const handlerChange = async ( event:ChangeEvent<HTMLInputElement>) => {

    if (changeFunc) {
      setLoading(true);
      try {
        const response = await changeFunc(event);
        if ( response ) {
          setIsChecked(!isChecked);
        } else {
          setIsChecked(isChecked);
        }
        
      } catch (error) {
        // console.error('Error in changeFunc:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setIsChecked(isChecked);
    }

  }
  return (
    <div className="text-gray-900 whitespace-no-wrap">
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          name={name}
          value={value} 
          checked={isChecked} 
          disabled={loading}  
          onChange={handlerChange} 
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 hidden sm:block">{ loading? <Spinner size="6" />: label}</span>
      </label>
    </div>
  )
}
