import { ChangeEvent, ForwardRefExoticComponent, SVGProps, useEffect, useRef } from "react";

interface InputTextProp {
    icon?:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> >;
    name?:string;
    label?:string;
    placeHolder?:string;
    value?:string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    classCss?:string;
    errorMessage?:string;
    focusEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
    blurEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
    setFocus?: boolean;
    disabled?: boolean;
}



export const InputText:React.FC<InputTextProp> = ({icon,name = 'input',label = 'Label',placeHolder='Label Name',value = '',handleChange,classCss = '',errorMessage,focusEvent,blurEvent,setFocus,disabled = false}) => {
  
  const Icon = icon;
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if ( inputRef?.current ){
      inputRef?.current?.focus();
    }
  }

  const handlerFocusEvent = ( event: any ) => {
    if ( focusEvent) {
      focusEvent(event);
    }
  }

  const handlerBlurEvent = ( event: any ) => {
    if ( blurEvent) {
      blurEvent(event);
    }
  }

  useEffect( () => {
    if ( setFocus) {
      focusInput();
    } 
  },[setFocus]);
  return (
    <div className={classCss}>
        <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        {label}
        </label>
        <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          {
            Icon && 
            <Icon className="text-gray-400 h-6 w-6" />
          }
          <input
            ref={inputRef}
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={ (event) => handlerFocusEvent(event)}
            onBlur={ (event) => handlerBlurEvent(event)}
            className="pl-2 w-full outline-none border-none bg-transparent"
            placeholder={placeHolder}
            disabled={disabled}
          />
        </div>
        <div className=" text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
    </div>
  )
}
