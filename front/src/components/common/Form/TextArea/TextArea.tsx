import { ChangeEvent } from "react";

interface TextAreaProp {
    name?:string;
    label?:string;
    placeHolder?:string;
    value?:string;
    handleChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    classCss?:string;
    rows?:number;
    disabled?:boolean;
    errorMessage?:string;
    focusEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
    blurEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
}

export const TextArea:React.FC<TextAreaProp> = ({name = 'input',label = 'Label',placeHolder='Label Name',value = '',handleChange,classCss = '',rows = 4,disabled,errorMessage = '',focusEvent,blurEvent}) => {
  
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

    return (
    <div className={classCss}>
        <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <textarea
            name={name}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeHolder}
            rows={rows}
            disabled={disabled}
            onFocus={ (event) => handlerFocusEvent(event)}
            onBlur={ (event) => handlerBlurEvent(event)}
        >
            {value}
        </textarea>
        <div className=" text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
    </div>

  )
}
