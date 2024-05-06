import { ChangeEvent,useState } from "react";
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline"

interface InputPasswordProp {
    name?:string;
    label?:string;
    placeHolder?:string;
    value?:string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    classCss?:string;
    errorMessage?:string;
    focusEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}



export const InputPassword:React.FC<InputPasswordProp> = ({name = 'input',label = 'Label',placeHolder='Label Name',value = '',handleChange,classCss = '',errorMessage,focusEvent,disabled = false}) => {
  
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handlerFocusEvent = ( event: any ) => {
    if ( focusEvent) {
      focusEvent(event);
    }
  }
  return (
    <div className={classCss}>
        <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        {label}
        </label>
        <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          { showPassword ? 
            <EyeSlashIcon className=" h-5 w-5 mr-2 text-gray-400" onClick={handleShowPassword} /> 
            : <EyeIcon className=" h-5 w-5 mr-2 text-gray-400" onClick={handleShowPassword} />
          }
          <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full outline-none border-none bg-gray-50"
          onFocus={ (event) => handlerFocusEvent(event)}
          placeholder={placeHolder}
          disabled={disabled}
          />
        </div>
        <div className=" text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
    </div>
  )
}

