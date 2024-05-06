import { ChangeEvent } from "react";

interface InputTextProp {
    name?:string;
    label?:string;
    placeHolder?:string;
    value?:string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    classCss?:string;
}

export const InputNumber:React.FC<InputTextProp> = ({name = 'input',label = 'Label',placeHolder='Label Name',value = '',handleChange,classCss = "col-span-2 sm:col-span-1"}) => {
  return (
    <div className={classCss}>
        <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        {label}
        </label>
        <input
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeHolder}
        />
    </div>
  )
}
