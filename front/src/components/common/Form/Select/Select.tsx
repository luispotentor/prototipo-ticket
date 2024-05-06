import { ChangeEvent } from "react";

import { ValueSelect } from "@/interfaces/ValueSelect";

interface SelectProp {
    name?:string;
    label?:string;
    defaultValue?:string;
    handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    classCss?:string;
    values?:ValueSelect[];
    errorMessage?:string;
    value?:string;
    disabled?:boolean;
}
export const Select:React.FC<SelectProp> = ({name = 'input',values,label = 'Label',defaultValue = '',handleChange,classCss = "",errorMessage,value,disabled}) => {
  return (
    <div className={classCss}>
        <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <select
            name={name}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
            {
                values && values.length > 0 ?
                values.map( (item,index) => (
                    <option key={index} value={item.value}>{item.name}</option>
                ) )
                
                :
                <option>Cargando...</option>
            }
            
        </select>
        <div className=" text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
        </div>

  )
}
