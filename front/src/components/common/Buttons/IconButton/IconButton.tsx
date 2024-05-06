
import { ForwardRefExoticComponent, SVGProps } from "react";

interface PropsIconLinkButton {
  icon:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> >;
  clickFunc?:  (item:any) => void;
  color?: string;
  size?:number;
  toolTip?:string;
}

const colorsBgHover:Record<string,string> = {
    blue: 'bg-blue-800',
    red : 'bg-red-800',
};

const colorText:Record<string,string> = {
    blue: 'text-indigo-300',
    red : 'text-red-300',
};

const colorTextHover:Record<string,string> = {
    blue: 'text-indigo-600',
    red : 'text-red-600',
};

export const IconButton:React.FC<PropsIconLinkButton> = ({
  icon,
  clickFunc,
  color = 'blue',
  size = 4,
  toolTip,
}) => {

  
  const Icon = icon;

  return (
      <div className={`p-2 rounded-lg cursor-pointer hover:${colorsBgHover[color]}`} >
        <Icon className={` w-${size} h-${size} ${colorText[color]} hover:${colorTextHover[color]}`} onClick={clickFunc} />
      </div>
  )
}
