"use client"

import { useState, useEffect } from "react";
import { Spinner } from "@/components/common/Spinner";

interface ButtonProps {
  label?:string;
  actionFunc?: () => void;
  loading?:boolean;
  disabled?:boolean;
  loadingText?:string;
  style?:string;
  color?:string;
}

const colorClasses:Record<string,string> = {
  blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
  red : 'bg-red-700 hover:bg-red-800 focus:ring-red-300',
};

const colorClassesDisabled:Record<string,string> = {
  blue: 'bg-blue-300',
  red : 'bg-red-300',
};

export const Button:React.FC<ButtonProps> = ({label = 'Button',loadingText = 'Loading...',loading = false,disabled = false,actionFunc,style = '',color = 'blue'}) => {
  
  const [buttonDisabled,setButtonDisabled] = useState(disabled);

  useEffect( () =>{
    setButtonDisabled(loading);
  },[loading]);

  useEffect( () =>{
    setButtonDisabled(disabled);
  },[disabled]);

  return (
    <button
      onClick={actionFunc}
      disabled={buttonDisabled}
      className={`text-white inline-flex items-center ${ buttonDisabled ? colorClassesDisabled[color] : colorClasses[color]}  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${style} `}
    >
      {
        loading ?
         <>
           <Spinner size="6" />
           {loadingText}
         </>
        :
        <>
          {label}
        </>
      }
        
    </button>

  )
}
